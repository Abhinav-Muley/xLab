import React, { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { LuPhone } from 'react-icons/lu'
import { MdOutlineEmail } from 'react-icons/md'
import { PiBuildingsBold } from 'react-icons/pi'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useAuthContext } from '../context/firebase-context'


function Newemployee({handlesecond}) {
  const [first, setFirst] = useState(true)
  const [img, setImg] = useState(null)
  const [objURL, setObjURL] = useState(null)
  const {doCreateUser, userLoader} = useAuthContext()
  // console.log("newemployee");
  return (
    <>
    <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
        <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
          onClick={handlesecond}
        ></div>
        <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
          <form className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]" onSubmit={(e)=>{doCreateUser(e,objURL);}}>
            <div className="flex items-center w-[100%] justify-between text-white">
              <h1 className="text-2xl font-bold">New Employee</h1>

              <button type='button'
              onClick={handlesecond}
              >
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
            <div className='flex gap-4 flex-wrap py-5 max-h-[400px] overflow-y-auto'>
                <div className="max-w-[300px] w-full mx-auto flex flex-col justify-center items-center gap-2">
                    <div className='bg-[#1A1C23] aspect-square max-w-[150px] '>
                        <label htmlFor="profile" >
                          
                        <input className='opacity-0' required type="file" accept='image/jpeg' name="profile" id="profile"  onChange={(e)=>{
                          if(e.target.files[0]){
                            setFirst(false); 

                            if(img){
                              URL.revokeObjectURL(img);
                              // console.log("revoke object");
                            }
                            setObjURL(e.target.files[0])
                            // console.log("create object");
                            setImg(window.URL.createObjectURL(e.target.files[0]))
                            
                            // console.log(objURL);
                            // console.log(e.target.files[0]);
                          }else{
                            setImg(null)
                            setFirst(true)
                            setObjURL(null)
                            alert("Please select the profile image!")
                          }

                          
                        }} />
                    {/* {console.log(img)} */}
                    
                    <div className = {`text-[#343434] cursor-pointer flex   justify-center items-center rounded-lg bg-[#1e2024]  aspect-square  ` }>{first? <div className="text-[#6c6c6c] bggg  w-[10px] h-[100px] flex  justify-center items-center  rounded-lg text-5xl"><FaRegUser></FaRegUser></div>: <div className="w-[100px]"> <img className='w-[100%] object-cover' src={img} alt="" />  </div>}</div>
                    
                        </label>

                    </div>
                    <h3 className='text-lg mt-10 font-semibold'>Profile Picture</h3>
                    <div className="flex gap-2">

                    <select name="profile" id="profile" required className='bg-[#1A1C23] outline-none border p-1 rounded-md border-[#505153]'>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select name="profile" id="profile" required className='bg-[#1A1C23] outline-none border p-1 rounded-md border-[#505153]'>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Devops">Devops</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                    </div>
                </div>
                
                <div className="grow shrink basis-[400px]   flex gap-2 flex-col">
                      <h1 className='text-[#DFE7EB] text-xl font-semibold'>Personal Information</h1>
                      <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <FaRegCircleUser  className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]'/> <input placeholder='Employee Name'   required className='border-l px-5 border-[#656565b9]   bg-[#1A1C23] w-full outline-none text-white  p-[10px]  '/></div>
                      <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <MdOutlineEmail  className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]'/> <input placeholder='Employee mail ID' required   className='border-l px-5 border-[#656565b9]   bg-[#1A1C23] w-full outline-none text-white  p-[10px]  '/></div>
                      <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <LuPhone  className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]'/> <input placeholder='Employee Mobile Number'  required  className='border-l px-5 border-[#656565b9] p-[10px] bg-[#1A1C23] w-full outline-none text-white  '/></div>
                      <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <FiHome  className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]'/> <input placeholder='Employee Designation'  required  className='border-l px-5 border-[#656565b9] p-[10px]  bg-[#1A1C23] w-full outline-none text-white '/></div>
                      <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <PiBuildingsBold  className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]'/> <input placeholder='Employee Address'  required  className='border-l px-5 border-[#656565b9]  bg-[#1A1C23] w-full outline-none text-white  p-[10px] '/></div>
                    </div>
                
            </div>
            <div className="flex justify-center">

            <button type='submit' className='max-w-[150px] w-full text-nowrap  bg-[#6C2BD9] py-1 rounded-md text-base font-medium mt-8 mb-1'>Create User</button>
            </div>
          </form>
        </div> 
      </div>
      {
        userLoader && 
        <>
      <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md ">
      </div>
<div className="flex justify-center items-center">

        <div className=" border-t-[#6C2BD9] absolute w-16 h-16 border-[8px] rounded-full transition-transform rotate-[360] top-[40%] left-[55%] ease-in-out  animate-spin ">

        </div>
        <p className='absolute top-[50%] left-[53%] text-[#DFE7EB] font-semibold'>Creating User . . .</p>
</div>
        </>
      }


    </>

  )
}

export default Newemployee
