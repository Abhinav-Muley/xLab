import React, { useEffect, useState } from 'react'
import Profile from "../assets/profile.jpeg"
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/firebase-context';
import { auth } from '../firebase/firebase-initialize';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

function Header({handleClick}) {
  const Auth = useAuthContext()
  const {currentUser,loggedIn, url} = useAuthContext()
  const [first, setfirst] = useState(false)
  const handleProfileClick = ()=>{
    setfirst(!first)
  }

// console.log("header");



  return (
    
    <div className='flex fixed right-0 left-0 top-0 bg-[#1A1C23] justify-between items-center p-6'>
      <div className='flex items-center gap-5 pl-1'>
      <IoMdMenu className=' text-3xl hidden max-sm:flex slate text-white' onClick={handleClick}/>
      <h3 className='text-[#e5e5e5] text-xl font-semibold '>Home</h3>
      </div>
      
      <img className='w-8 aspect-square rounded-full cursor-pointer' src={url} alt="" onClick={handleProfileClick}/>
      {first && 
      <>
      <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0  "
          onClick={handleProfileClick}
        ></div>
      <div className='absolute right-0 bottom-0 translate-y-[70%] mr-3 '>
      
        <ul className='list-none pl-2 pr-5 py-2 bg-[#24262D] text-[#e5e5e5] rounded-md'>
          <NavLink to={"/profile"}>
          <li className='px-1  py-1 flex cursor-pointer items-center text-sm font-medium gap-2 '><CgProfile className='text-base'/>  Profile</li></NavLink>
          <li className='px-1  py-1 flex cursor-pointer items-center text-sm font-medium gap-2 ' onClick={Auth.doSignOut }><TbLogout2 className='text-base'/> Logout</li>
        </ul>
      </div> 
      </> 
      }
    </div>
  )
}

export default Header
