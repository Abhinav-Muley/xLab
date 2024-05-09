import React, { useState } from 'react'
import { useAuthContext } from '../context/firebase-context'


function Login({handleLogin}) {
  const AuthContext = useAuthContext()
  
  
  const signIn=(e)=>{
    e.preventDefault()
    // console.log(e.target[1].value);
    AuthContext.doSignInWithEmailAndPassword(e.target[0].value,e.target[1].value)

  }
  // console.log("login");
  
  
  return (
    <div className='bg-[#121317] h-[100vh] flex justify-center items-center '>
      <div className='text-[#E5E7EB] max-w-[400px] -translate-y-[20px] grow shrink bg-gradient-to-tl from-black from-5% to-white to-[300%] border-[#ffffffa7] border p-10 rounded-md'>
        <h3 className='text-center text-2xl font-medium'>Welcome back</h3>
         <p className='text-center'>It's great to see you</p>
         <p className='text-center'>Login to your account below</p>
         <form action="" className=' m-auto py-4 flex flex-col gap-2' onSubmit={e=>signIn(e)}>
          <div className='flex flex-col gap-1 '>

          <label htmlFor="email" className='text-base'>Email Id</label>
          <input className='px-2 py-1 text-black rounded-[4px]' type="text" id="email"/>
          </div>
          <div className='flex flex-col gap-1'>

          <label htmlFor="password" className='text-base'>Password</label>
          <input className='px-2 py-1 text-black rounded-[4px]' type="password" id="password"/>
          </div>
          <button className='bg-[#6C2BD9] w-[100%] py-[5px] rounded-[4px] mt-2 font-bold text-base cursor-pointer' >Sign In</button>
          <p className='text-center mt-1 cursor-pointer'>Forgot your password?</p>
          
         </form>
      </div>
    </div>
  )
}

export default Login
