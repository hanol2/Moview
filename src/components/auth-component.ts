import { styled } from 'styled-components';

export const Wrapper = styled.div`
    height : 100%;
    display : flex;
    flex-direction : column;
    align-items : center;
    width: 420px;
    padding : 100px 0;
`;

export const Title = styled.h1`
    font-size : 42px;
    margin-bottom: 5px;
`;


export const TitleLogo = styled.img`
width:150px;
height:50px;
` 


export const Form = styled.form`
    margin-top : 50px;
    margin-bottom : 10px;
    display : flex;
    flex-direction : column;
    gap : 10px;
    width : 100%
    `;

export const Input = styled.input`
padding : 10px 20px;
border-radius : 50px;
border : none;
width : 100%;
font-size : 16px;
&[type="submit"] {
        background-color : #8062D6;
        color : white;
        cursor : pointer;
        &:hover {
            opacity : 0.8;
        }
    }
    `;

export const Error = styled.span`
font-weight : 600;
color : tomato;
`;


export const Switcher = styled.span`
margin-top : 20px;
a {
    color : #8062D6;
}
`
