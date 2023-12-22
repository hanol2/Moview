import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
// import EditModal from "./edit-modal";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  `;

const Column = styled.div`

`;

const Photo = styled.img`
width: 100%;
border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const ModifyButton = styled.div`
position: relative;
svg {
  cursor : pointer;
  display : flex;
  align-items : center;
  justify-content : center;
        width : 20px;
    }
`

const Modal = styled.div`
 border: 1px solid rgba(255, 255, 255, 0.5);
padding: 5px 10px;
line-height: 30px;
 position:absolute;
 right: -5px;
width: 100px;
  border-radius: 10px;
  background-color: black;
  opacity:80%;
`

const DeleteButton = styled.div`
  display : flex;
  align-items : center;
  width:100px;
  cursor: pointer;
`

const EditButton = styled.div`
  display : flex;
  align-items : center;
  width:100px;
  cursor: pointer;
`


export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
    const [modal, setModal] = useState(false);

    const user = auth.currentUser;

    const onModify = () => {
          setModal(!modal);
    }
    
    const onDelete = async() => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id))
            if(photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    }

  return (
    <Wrapper>
      <Column className="modifyNav">
<div style={{display: "flex", justifyContent: "space-between"}}>

        <Username>{username}</Username>

        {user?.uid === userId ? 
        <ModifyButton onClick={onModify}>
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
</svg>
{ modal ? <Modal> <EditButton ><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
</svg> edit</EditButton>
<DeleteButton onClick={onDelete}><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" />
</svg> delete</DeleteButton></Modal> : null  
}
</ModifyButton>
: null}
      

</div>

      </Column>
      <Column>
        <Payload>{tweet}</Payload>
      {photo ? (
        <Photo src={photo} />
        ) : null}
      </Column>

    </Wrapper>
  );
}