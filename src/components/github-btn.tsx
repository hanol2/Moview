import { GithubAuthProvider, TwitterAuthProvider, sendPasswordResetEmail, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
margin-top : 50px;
background-color : white;
font-weight : 500;
width : 100%;
color : black;
padding: 10px 20px;
border-radius : 50px;
border : 0;
display : flex;
gap : 5px;
align-items : center;
justify-content : center;
cursor : pointer;
`;

const Logo = styled.img`
height : 25px;
`;

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {

        try {
            const provider = new GithubAuthProvider();
            // const tp = new TwitterAuthProvider(); 트위터 로그인
            //  팝업창을 로그인
            await signInWithPopup(auth, provider);
            // 리다이렉트로 로그인
            // await signInWithRedirect(auth, provider);
            navigate("/")
            // 챌린지 <‘비밀번호를 잊었어요’버튼 클릭시 ⇒ 이메일 받도록하기!>
            // sendPasswordResetEmail(auth, email)
            sendPasswordResetEmail()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Continue with Github
        </Button>
    )
}                           