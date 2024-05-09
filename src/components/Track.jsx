import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCardholderFill } from "react-icons/pi";
import { MdPending } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useAuthContext } from '../context/firebase-context';


function Track() {
  const {taskCount, projectCount, isAdmin} = useAuthContext()
  // console.log("track");

  return (
    <>
       <h1 className="text-[#E5E7EB] text-2xl font-bold">Dashboard</h1>
          <section
            className="grid  grid-flow-row gap-4 py-5 pt-4 grid-cols-1  sm:grid-cols-2 lg:grid-cols-4"
            // style={{
            //   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            // }}
          >
            {/* {
              isAdmin &&
            <div className=" h-[100px] rounded-md bg-[#1A1C23] flex justify-start gap-3 px-5 items-center ">
              <FaPeopleGroup className="text-white w-5 h-5 bg-[#FF5A1F] box-content p-3 rounded-full" />
              <div className="flex flex-col gap-1">
                <p className="text-[#9E9E9E] text-[13px] font-bold">Total Projects</p>
                <h1 className="text-2xl font-semibold text-[#FEFEFE]">{projectCount}</h1>
              </div>
            </div>
            } */}
            <div className=" h-[100px] rounded-md bg-[#1A1C23] flex justify-start gap-3 px-5 items-center ">
              <FaPeopleGroup className="text-white w-5 h-5 bg-[#FF5A1F] box-content p-3 rounded-full" />
              <div className="flex flex-col gap-1">
                <p className="text-[#9E9E9E] text-[13px] font-bold">Total Projects</p>
                <h1 className="text-2xl font-semibold text-[#FEFEFE]">{projectCount}</h1>
              </div>
            </div>
            <div className=" h-[100px] rounded-md bg-[#1A1C23] flex justify-start gap-3 px-5 items-center ">
              <PiCardholderFill className="text-white w-5 h-5 bg-[#0E9F6E] box-content p-3 rounded-full" />
              <div className="flex flex-col gap-1">
                <p className="text-[#9E9E9E] text-[13px] font-bold">Tasks on hold</p>
                <h1 className="text-2xl font-semibold text-[#FEFEFE]">{taskCount[0]}</h1>
              </div>
            </div>
            <div className=" h-[100px] rounded-md bg-[#1A1C23] flex justify-start gap-3 px-5 items-center ">
              <MdPending className="text-white w-5 h-5 bg-[#3F83F8] box-content p-3 rounded-full" />
              <div className="flex flex-col gap-1">
                <p className="text-[#9E9E9E] text-[13px] font-bold">Tasks Pending</p>
                <h1 className="text-2xl font-semibold text-[#FEFEFE]">{taskCount[1]}</h1>
              </div>
            </div>
            <div className=" h-[100px] rounded-md bg-[#1A1C23] flex justify-start gap-3 px-5 items-center ">
              <FaShoppingCart className="text-white w-5 h-5 bg-[#8b8b8b] box-content p-3 rounded-full" />
              <div className="flex flex-col gap-1">
                <p className="text-[#9E9E9E] text-[13px] font-bold">Total Tasks</p>
                <h1 className="text-2xl font-semibold text-[#FEFEFE]">{taskCount[2]}</h1>
              </div>
            </div>
            
          </section>
    </>
  )
}

export default Track
