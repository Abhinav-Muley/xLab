import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-initialize';
import { useAuthContext } from '../context/firebase-context';

function ProjectDetails() {
  const {loggedIn} = useAuthContext()
  const [data, setData] = useState(null)
  let params = new URLSearchParams(location.search);
  useEffect(() => {
const func = async()=>{
  let id =  params.get('id')
  const docRef =  doc(db, "Projects", id+"" );
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  setData(docSnap.data())
} else {
  // docSnap.data() will be undefined in this case
  // console.log("No such document!");
}
}
func()

}, [loggedIn]);
// console.log("project details");
  return (
    <div className='p-2 flex flex-col gap-4 max-w-[1500px] bg-[#121317]  mx-auto'>
      <div className='px-4 py-5 bg-[#212228] rounded-lg'>
        <h1 className='text-2xl font-bold text-[#E5E7EB] py-3'>Project Description</h1>
        {data && <div className='py-4 px-3 text-[#9E9E9E] font-medium rounded-lg flex flex-col gap-4 bg-[#1A1C23]'>
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Project Name</p>
            <p className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'>{data.projectName}</p>
            </div>
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Project Description</p>
            <textarea readOnly defaultValue={data.projectDesc} className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'></textarea>
            </div>
            <div className=" flex gap-6 justify-between flex-wrap  pt-2" style={{gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))"}}>
                {/* <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Lead <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.lead}</p> </div> */}
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Start Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.startDate}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Priority <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.priority}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Due Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.dueDate}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Status <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.status}</p> </div>
                {/* <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Tech Stack <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.techStack}</p> </div> */}
            </div>
        </div>}
      </div>
      {/* <div className='px-4 py-5 bg-[#212228] rounded-lg'>
        <h1 className='text-2xl font-bold text-[#E5E7EB] py-3'>Task Description</h1>
        <div className='py-4 px-3 text-[#9E9E9E] font-medium rounded-lg flex flex-col gap-4 bg-[#1A1C23]'>
            
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Task 1</p>
            <p className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'>Netlify Task Description Here</p>
            </div>
            <div className=" flex gap-6 justify-between flex-wrap  pt-2" style={{gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))"}}>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Caller <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>Abhinav Muley</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Start Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>2024-12-02</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Priority <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>1</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Employee <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>Abhinav Muley</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Due Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>2024-12-15</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Status <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>Pending</p> </div>
            </div>
        </div>
      </div> */}

    </div>
  )
}

export default ProjectDetails
