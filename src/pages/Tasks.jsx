import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-initialize';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthContext } from '../context/firebase-context';

function Tasks() {

  const { allTasks} = useAuthContext()
  // const [data,setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
     
  //    const fetchedData = [];
     
  //     const dbas = collection(db, "tasks"); // Replace "your-collection-name" with your actual collection name
  //     const querySnapshot = await getDocs(dbas);
  //     querySnapshot.forEach((doc) => {
  //       if(isAdmin){
  
  //         fetchedData.push({...doc.data(),id:doc.id});
          
  //       }else if(doc.data().caller == name || doc.data().employee == name){
  //         fetchedData.push({...doc.data(),id:doc.id});

  //       }
        
  //     });
  //     setData(fetchedData);
  //   };
  //   fetchData();
  // }, [name, loggedIn]);
  
  // console.log("inside tasks");

  return (
    <div className='h-[100vh] bg-[#121317] p-5 '>
      <div className='overflow-x-scroll scrolle'>
        <table className='text-[#D5D6D7] mx-auto w-[1500px] bg-[#1A1C23] rounded-md text-[13px]'>
            <thead className='h-[50px] text-sm'>
                <tr className='border-b-[0.1px] border-[#51515161]'>

                <th className='py-1 px-2 w-20'>PROJECT NAME</th>
                <th className='py-1 px-2 w-20'>TASK DESCRIPTION</th>
                <th className='py-1 px-2 w-20'>LEAD</th>
                <th className='py-1 px-2 w-20'>EMPLOYEE</th>
                <th className='py-1 px-2 w-20'>PRIORITY</th>
                <th className='py-1 px-2 w-20'>START DATE</th>
                <th className='py-1 px-2 w-20'>DUE DATE</th>
                <th className='py-1 px-2 w-20'>STATUS</th>
                </tr>
            </thead>
            <tbody>
              {
                allTasks.map((item,i)=>(

                <tr key={i} className='h-[50px] border-b-[0.1px] font-medium text-xs border-[#51515161]'>

                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.project}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.taskDesc}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.caller}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.employee}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.priority}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.startdate}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.duedate}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.status}</td>
                </tr>
                ))
              }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tasks
