
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CloseButton = styled.div`
cursor : pointer;
svg{
  position: fixed;
  color: white;
  width: 20px;
  height: 20px;
  z-index: 1;
} 
`

const Form = styled.form`
position: absolute;
display: flex;
flex-direction: column;
background-color: #333333;
width: 602px;
border-radius: 10px;
`;

const TextArea = styled.textarea`
margin-top : 40px;
border: 2px solid white;
border-radius: 20px;
background-color: black;
padding: 20px;
font-size : 16px;
color : white;
width : 100%;
resize : none;
 &::placeholder {
    font-size : 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }
 &:focus {
    outline : none;
    border-color : #8062D6;
 }
`;

const AttachFileButton = styled.label`
margin-top : 20px;
  padding: 10px 0px;
  color:  #8062D6;
  text-align: center;
  border-radius: 20px;
  border: 1px solid  #8062D6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
margin-bottom: 20px;
  background-color:  #8062D6;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;


export default function PostTweetForm () {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
    return (

        <Form onSubmit={onSubmit}>
            <CloseButton ><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
   <path clipRule="evenodd" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
 </svg></CloseButton>
            <TextArea 
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={tweet} placeholder="What is happening?"/>
            <AttachFileButton htmlFor="file">{file ? "Photo added✅" : "Add photo"}
            </AttachFileButton>
            <AttachFileInput 
            onChange={onFileChange}
            type="file"
            id="file" accept="image/*"/>
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
        </Form>
    )
}