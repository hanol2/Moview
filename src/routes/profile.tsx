import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Tweet from "../components/tweet";
import { ITweet } from "../components/timeline";

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
gap : 20px;
margin-top: 50px;
`;

const AvatarUpload = styled.label`
width: 80px;
overflow: hidden;
height: 80px;
border-radius: 50%;
background-color: #8062D6;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
 svg{
    width : 50px;
 }
`;

const AvatarImg = styled.img`
    width: 100%;
`;
const AvatarInput = styled.input`
display: none;
`;
const Name = styled.span`
 font-size: 22px;
 `;

 const Tweets = styled.div`
    display: flex;
     width: 100%;
    flex-direction: column;
    gap: 10px;
 `

 const NameEdit = styled.div`
 svg {
  cursor : pointer;
  display : flex;
  align-items : center;
  justify-content : center;
   height : 30px;
        width : 20px;
        margin-left: 5px;
    }
`

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL); // user가 null일수도 있음
    const [tweets, setTweets] = useState<ITweet[]>([]); // 배열로 호출되는 인터페이스를 갖게 될것이고 빈 배열로 시작할것임

    const onAvatarChange = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;
        if (!user) return ;
        if(files && files.length === 1){
            const file = files[0]
            const locationRef = ref(storage, `avatars/${user?.uid}`)
            const result = await uploadBytes(locationRef, file)
            const avatartUrl = await getDownloadURL(result.ref);
            setAvatar(avatartUrl);
            await updateProfile(user, {
                photoURL : avatartUrl
            })
        }
    }
   const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

//   const onEditName = async(e:React.ChangeEvent<HTMLSpanElement>) => {
//     const {name} = e.target;
//     if(!user) return;
//     if (name && name.length === 1) {

//     }
//   }
  useEffect(() => {
    fetchTweets();
  }, []);

    return (
        <Wrapper>
            <AvatarUpload htmlFor="avatar">
               {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
</svg>)}
            </AvatarUpload>
            <AvatarInput 
            onChange={onAvatarChange}
            id="avatar" 
            type="file" 
            accept="image/*"/>
            <div style={{display: 'flex'}}>
            <Name>{user?.displayName ?? "Anonymous"}</Name>
            <NameEdit> 
            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
</NameEdit>
            </div>
            <Tweets>
                {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
            </Tweets>
        </Wrapper>
    )
}