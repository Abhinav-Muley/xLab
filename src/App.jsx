import React, { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Container from './components/Container.jsx'
import Projects from './pages/Projects.jsx'
import Tasks from './pages/Tasks.jsx'
import FinishedTasks from './pages/FinishedTasks.jsx'
import Profile from './pages/Profile.jsx'
import { Navigate, Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { AuthContextProvider, useAuthContext } from './context/firebase-context.jsx'
// import { useAuth } from './context/Context.jsx'

function App() {
  const AuthContext = useAuthContext()
  // const { userLoggedIn } = useAuth()
  const a=AuthContext.loggedIn
  // console.log("app");
  // console.log(AuthContext.auth.currentUser);
  
  const [first, setfirst] = useState(false)
  const [second, setSecond] = useState(false)
  const handleClick = ()=>{
    
      setSecond(!second)
     
      }
      

const handleLogin=()=>{
  
  if(first){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  if(auth.currentUser != null){

    setfirst(!first)
  }
  
}
setTimeout(() => {
  <>
  <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg ">
      </div>
<div className="flex justify-center items-center">

        <div className=" border-t-[#6C2BD9] absolute w-16 h-16 border-[8px] rounded-full transition-transform rotate-[360] top-[40%] left-[55%] ease-in-out  animate-spin ">

        </div>
        {/* <p className='absolute top-[50%] left-[53%] text-[#DFE7EB] font-semibold'>Creating User . . .</p> */}
</div>
  </>
}, 1000);
// Initialize Firebase
  return (
    <>
    {/* {AuthContext.auth.currentUser? <Navigate to="/" replace={true}></Navigate>:null } */}

    {AuthContext.auth.currentUser? 
    <> 
    
    <Header handleClick={handleClick} handleLogin={handleLogin}/>
    <Sidebar w={second}/>
    {AuthContext.loginLoader && <>
      <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md ">
      </div>
<div className="flex justify-center items-center">

        <div className=" border-t-[#6C2BD9] absolute w-16 h-16 border-[8px] rounded-full transition-transform rotate-[360] top-[40%] left-[55%] ease-in-out  animate-spin ">

        </div>
        {/* <p className='absolute top-[50%] left-[53%] text-[#DFE7EB] font-semibold'>Creating User . . .</p> */}
</div>
        </>}
    
    <Container >
    
    <Outlet/>
    </Container>
    </>
  :  <Login handleLogin={handleLogin}/>
}

</>
  )
}

export default App
