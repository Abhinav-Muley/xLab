import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-initialize';
import { useAuthContext } from '../context/firebase-context';
import { IoMdClose } from 'react-icons/io';

function TaskDetails() {
  const {loggedIn} = useAuthContext()
  const [data, setData] = useState(null)
  const [first, setFirst] = useState(false)
  const [prData, setPrData] = useState(null)
  const [summary, setSummary] = useState([])
  let params = new URLSearchParams(location.search);
  useEffect(() => {
const func = async()=>{
  let id =  params.get('id')
  const docRef =  doc(db, "tasks", id+"" );
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

}, []);
  useEffect(() => {
    const func = async()=>{
      let pr= []
      const q = query(collection(db, "Projects"), where("projectName", "==", data.project));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        pr.push({ ...doc.data(), id: doc.id })
        // totalprojectcount++;
      });

      setPrData(pr)
    }
    if(data){
      func()
      
    }

}, [data]);
  useEffect(() => {
    const func = async()=>{
      
        try {
          
          let pr= []
          let params = new URLSearchParams(location.search);
          let id =  params.get('id')
          
          
          const databaase = collection(db, id ); // Replace "your-collection-name" with your actual collection name
        const Snapshot = await getDocs(databaase);
        Snapshot.forEach((doc) => {
          console.log(doc.data());
          pr.push(doc.data())
          
        })
        
        setSummary(pr)
      } catch (error) {
        
      }
    
    }
    // if(data){
      func()
      
    // }

}, [ first ]);



const handleNewSummary = async(e)=>{
  e.preventDefault()
  let params = new URLSearchParams(location.search);
  let id =  params.get('id')

  let date = new Date().toJSON().slice(0, 10);
  // console.log(id);
  const docRef = await addDoc(collection(db, id), {
  summary: e.target[0].value,
  date:date
});
  alert("Today's Summary Added!")
  setFirst(false)
}
// console.log("datask detailta", prData);
  return (
    <div className='p-2 flex flex-col gap-4 max-w-[1500px] bg-[#121317]  mx-auto'>
      {
        prData && <div className='px-4 py-5 bg-[#212228] rounded-lg'>
        <h1 className='text-2xl font-bold text-[#E5E7EB] py-3'>Project Description</h1>
        <div className='py-4 px-3 text-[#9E9E9E] font-medium rounded-lg flex flex-col gap-4 bg-[#1A1C23]'>
            
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Project Name</p>
            <p className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'>{prData[0].projectName}</p>
            <p className='text-[#E5E7EB]'>Project Description</p>
            <textarea readOnly defaultValue={prData[0].projectDesc} className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'></textarea>
            </div>
            <div className=" flex gap-6 justify-between flex-wrap  pt-2" style={{gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))"}}>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Lead <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{prData[0].lead}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Start Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{prData[0].startDate}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Priority <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{prData[0].priority}</p> </div>
                {/* <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Employee <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>Abhinav Muley</p> </div> */}
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Due Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{prData[0].dueDate} </p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Status <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{prData[0].status}</p> </div>
            </div>
        </div>
      </div>
      }
      <div className='px-4 py-5 bg-[#212228] rounded-lg'>
        <div className="flex justify-between items-center pb-1">

        <h1 className='text-2xl font-bold text-[#E5E7EB] py-3'>Task Description</h1>
        <button className=" py-2 rounded-md px-[8px] bg-[#6C2BD9] text-[#FEFEFE] text-sm font-semibold flex items-center" onClick={()=>setFirst(!first)}> + Day Summary</button>
        </div>
        {data && <div className='py-4 px-3 text-[#9E9E9E] font-medium rounded-lg flex flex-col gap-4 bg-[#1A1C23]'>
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Project Name</p>
            <p className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'>{data.project}</p>
            </div>
            <div className='flex flex-col gap-2'>

            <p className='text-[#E5E7EB]'>Task Description</p>
            <textarea readOnly defaultValue={data.taskDesc} className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'></textarea>
            </div>
            <div className=" flex gap-6 justify-between flex-wrap  pt-2" style={{gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))"}}>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Caller <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.caller}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Start Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.startdate}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Priority <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.priority}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB] text-nowrap'>Due Date <p className='bg-[#24262d] text-[#9E9E9E] w-full border-2 border-[#2b2d35] rounded-md px-2 p-1'>{data.duedate}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Status <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.status}</p> </div>
                <div className='flex items-center w-full max-w-[350px] gap-2 text-[#E5E7EB]'>Employee <p className='bg-[#24262d] w-full border-2 text-[#9E9E9E] border-[#2b2d35] rounded-md px-2 p-1'>{data.employee}</p> </div>
            </div>
        </div>}
      </div>
      {first && <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
        <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
          onClick={()=>setFirst(!first)}
        ></div>
        <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
          <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
            <div className="flex items-center w-[100%] justify-between text-white">
              <h1 className="text-2xl font-bold">Add Summary Note</h1>

              <button onClick={()=>setFirst(!first)}>
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
            <form action="" className="pt-2 flex flex-col gap-6 max-h-[500px] overflow-y-auto" onSubmit={(e)=> handleNewSummary(e)}>
              {/* <textarea name="" id=""></textarea> */}
            <textarea className='px-2 mx-1 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'></textarea>
              
              <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]">Add Summary</button>
            </form>
          </div>
        </div>
      </div> }
      <div className='px-4 py-5 bg-[#212228] rounded-lg'>
        <h1 className='text-2xl font-bold text-[#E5E7EB] py-3'>Daily Summary</h1>
        <div className='py-4 px-3 text-[#9E9E9E] font-medium rounded-lg flex flex-col gap-4 bg-[#1A1C23]'>
            
            
            

      {
        summary.map((item,i)=>(
          <div key={i}>
          <p>{item.date}</p>
          <p className='px-2 py-1 bg-[#24262D] border-[#2b2d35] border-2 rounded-md'>{ item.summary }</p>
          </div>
        
        ))
      }
      </div>
    </div>

    </div>
  )
}

export default TaskDetails
