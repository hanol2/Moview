import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from  "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import LodingScreen from "./components/loading-screen";
import { styled } from 'styled-components';
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path:"/",
    element : ( 
    <ProtectedRoute>
      <Layout/>
      </ProtectedRoute>
    ),
    children:[
   {
    path:"",
    element: 
      <Home/>
   },
   {
    path:"profile",
    element: 
      <Profile/>
   }
    ]
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path :"/create-account",
    element: <CreateAccount/>,
  }
])

//reset이 아니라 onreset만 정의되어있음
const GlobalStyles = createGlobalStyle`
 ${reset};
 * {
 box-sizing: border-box;
 }
 body {
 background-color: black;
 color: white;
 font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }

 `;

 const Wrapper = styled.div`
 height : 100vh;
 display : flex; 
 justify-content : center;
 `;

function App() {

const [isLoading, setLoading] = useState(true);

const init = async()=>{
  // firebase 기다리는중
  await auth.authStateReady();
  // setTimeout(()=> setLoading(false), 2000)
  setLoading(false);
}

useEffect(()=>{
  init();
  console.log(init())
},[])

  return (
    <Wrapper>
    <GlobalStyles/>
    {isLoading ? <LodingScreen/> : <RouterProvider router={router}/>}
    </Wrapper>
  )
}

export default App;

