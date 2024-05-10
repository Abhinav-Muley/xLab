import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/firebase-context';
import { db } from '../firebase/firebase-initialize';
import { collection, getDocs } from 'firebase/firestore';

function Projects() {
  const { allProjects } = useAuthContext()
  const [data,setData] = useState([]);
  useEffect(() => {
    
    let inCompleteProjects = []
    allProjects.map((item,i)=>{
      if(item.status != "Complete" ){
        inCompleteProjects.push({...item,id:item.id})
        // console.log(item.id);
        // totalcount++;
      }

    })
    // setProjectCount(totalcount)
    setData(inCompleteProjects)

  }, [allProjects])
  // useEffect(() => {
  //   const fetchData = async () => {
     
  //    const fetchedData = [];
     
  //     const dbas = collection(db, "Projects"); // Replace "your-collection-name" with your actual collection name
  //     const querySnapshot = await getDocs(dbas);
  //     querySnapshot.forEach((doc) => {
        
  //         if(isAdmin){
  
  //           fetchedData.push({...doc.data(),id:doc.id});
  //         }else if( doc.data().lead == name){
  //           fetchedData.push({...doc.data(),id:doc.id});
  
  //         }
        
  //       // if(doc.data().lead == name ){
  
  //       //   fetchedData.push({...doc.data(),id:doc.id});
          
  //       // }
        
  //     });
  //     setData(fetchedData);
  //   };
  // // console.log("inside projects");
  //   fetchData();
  // }, [name, loggedIn]);

// console.log("projects");

  return (
    <div className=' p-5 '>
      <div className='overflow-x-scroll scrolle '>
        <table className='text-[#D5D6D7] mx-auto  w-[1500px] bg-[#1A1C23] rounded-md text-[13px]'>
            <thead className='h-[50px] text-sm'>
                <tr className='border-b-[0.1px] border-[#51515161]'>

                <th className='py-1 px-2 w-20'>PROJECT NAME</th>
                <th className='py-1 px-2 w-20'>PROJECT DESCRIPTION</th>
                <th className='py-1 px-2 w-20'>LEAD</th>
                <th className='py-1 px-2 w-20'>PRIORITY</th>
                <th className='py-1 px-2 w-20'>ENDS IN</th>
                <th className='py-1 px-2 w-20'>START DATE</th>
                <th className='py-1 px-2 w-20'>DUE DATE</th>
                <th className='py-1 px-2 w-20'>STATUS</th>
                </tr>
            </thead>
            <tbody>
              {
                data.map((item,i)=>(

                <tr key={i} className='h-[50px] border-b-[0.1px] font-medium text-xs border-[#51515161]'>

                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.projectName}</td>
                <td className='py-1 max-w-[100px] text-nowrap overflow-auto scrolle px-2 text-center'>{item.projectDesc}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.lead}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.priority}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{
                 
                 (!(new Date(item.startDate) instanceof Date) || isNaN(new Date(item.startDate).getTime()) ||
                 !(new Date(item.dueDate) instanceof Date) || isNaN(new Date(item.dueDate).getTime())) ?  "ERROR" :
                    (Math.floor(Math.abs( new Date(item.startDate).getTime() - new Date(item.dueDate).getTime() )) / (1000 * 60 * 60 * 24)) 
                  
                }</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.startDate}</td>
                <td className='py-1 max-w-[100px] overflow-auto scrolle px-2 text-center'>{item.dueDate}</td>
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

export default Projects
