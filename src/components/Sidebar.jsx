import React, { useEffect } from 'react'
import { TiHomeOutline } from "react-icons/ti";
import { GoProjectSymlink } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/firebase-context';

function Sidebar({w}) {
  // console.log("sidebar");
  const { isAdmin } = useAuthContext()
  return (
    
    <div className={`bg-[#1A1C23] text-white  fixed left-0 bottom-0 transition-all top-[79px] ${w ? "max-sm:w-[250px]": "max-sm:w-[0px]"} w-[250px] overflow-hidden`} >
      
      <ul className='list-none p-0 flex flex-col gap-1'>
        <NavLink className={({ isActive }) => (isActive ? "border-l-[5px] border-[#6C2BD9] text-white" : "text-[#ffffff80]")} to={"/"} ><li className='flex items-center gap-2 py-3 px-8 text-sm font-medium text-nowrap cursor-pointer'><TiHomeOutline className='w-4 h-4' /> Dashboard</li></NavLink>
        {isAdmin &&
        <NavLink className={({ isActive }) => (isActive ? "border-l-[5px] border-[#6C2BD9] text-white" : "text-[#ffffff80]")} to={"/projects"} ><li className='flex items-center gap-2 py-3 px-8 text-sm font-medium text-nowrap cursor-pointer'><GoProjectSymlink className='w-4 h-4' /> Projects</li></NavLink>
        }
        <NavLink className={({ isActive }) => (isActive ? "border-l-[5px] border-[#6C2BD9] text-white" : "text-[#ffffff80]")} to={"/tasks"} ><li className='flex items-center gap-2 py-3 px-8 text-sm font-medium text-nowrap cursor-pointer'><FaTasks className='w-4 h-4' /> Tasks</li></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "border-l-[5px] border-[#6C2BD9] text-white" : "text-[#ffffff80]")} to={"/finishedtasks"} ><li className='flex items-center gap-2 py-3 px-8 text-sm font-medium text-nowrap cursor-pointer'><MdIncompleteCircle className='w-4 h-4' /> Finished Tasks</li></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "border-l-[5px] border-[#6C2BD9] text-white" : "text-[#ffffff80]")} to={"/profile"} ><li className='flex items-center gap-2 py-3 px-8 text-sm font-medium text-nowrap cursor-pointer'><CgProfile className='w-4 h-4' /> Profile</li></NavLink>
      </ul>
    </div>
  )
}

export default Sidebar
