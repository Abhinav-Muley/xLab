import React, { useEffect, useState } from 'react'
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import PopupNewProject from './PopupNewProject';
import EditPendingProject from "./EditPendingProject"
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { auth, db } from '../firebase/firebase-initialize';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useAuthContext } from '../context/firebase-context';
import { IoMdClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

function PendingProjects({second,projectClick,projectClic}) {
  // let arr = [1,1,1,1];
  const [third, setThird] = useState(false);
  const [editele, setEditEle] = useState(null);
  // console.log("pending projects");
  const projectEditClick = (ele)=>{
    setThird(!third)
    setEditEle(ele)
  }
  const handleDeletepr = (id)=>{
    let isConfirm = confirm("Your task will be deleted!")
    if(isConfirm){
      
      deleteProject(id)
    }
  }
  const [data, setData] = useState([]);
  const { currentUser, isAdmin, deleteProject,setProjectCount, allEmployee,allProjects,getAllProjects} = useAuthContext()
  useEffect(() => {
    let totalcount =0
    let inCompleteProjects = []
    
    allProjects.map((item,i)=>{
      if(item.status != "Complete" && item.lead == currentUser.email){
        inCompleteProjects.push({...item,id:item.id})
        // console.log(item.id);
        totalcount++;
      }

    })
    setProjectCount(totalcount)
    setData(inCompleteProjects)

  }, [allProjects])
  const [projectLead, setProjectLead] = useState([])
  useEffect(() => {
    const empp = []
    const fetchedData = async()=>{
    const q = query(collection(db, "users"), where("profile", "==", "admin"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      empp.push({...doc.data(), id:doc.id})
    });
    console.log(empp);
    setProjectLead(empp)
    }
    fetchedData()
  }, [])
  
//   useEffect(() => {
//     const fetchData = async () => {
      
//       const fetchedData = [];
//       console.log("pending project");
   
//     // const dbas = collection(db, "Projects"); // Replace "your-collection-name" with your actual collection name
//     // const querySnapshot = await getDocs(dbas);
//     // querySnapshot.forEach((doc) => {
//     //   // if(doc.data().lead == name && doc.data().status !== "Complete"){
      

//     //   //   fetchedData.push({...doc.data(),id:doc.id});
        
//     //   //   projectCount++;
//     //   // }
//     //   if(doc.data().status !== "Complete"){
//     //     if(isAdmin){

//     //       fetchedData.push({...doc.data(),id:doc.id});
//     //       projectCount++;
//     //     }
//     //     else if(doc.data().lead == name){
//     //       fetchedData.push({...doc.data(),id:doc.id});
//     //       projectCount++;
          
//     //     }
//     //   }
      
//     // });

//     setData(fetchedData);
//     // console.log("Fetched Data:", fetchedData);
//     // setProjectCount(projectCount)
//   };
//   // console.log("inside pending projects");
//   fetchData();
// }, [ allProjects]);

const handleEditProject = async(e,id)=>{
  e.preventDefault()
  const q = doc(db, "Projects", id);  
  await updateDoc(q, {
    projectName: e.target[0].value,
    projectDesc: e.target[1].value,
    lead : e.target[2].value,
    dueDate: e.target[3].value,
    priority: e.target[4].value,
    status: e.target[5].value,
  });

  console.log(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value,e.target[5].value);
  // location.reload();
  getAllProjects()
  setThird(false)
}

  return (
    <section className='bg-[#1A1C23] rounded-lg overflow-hidden mt-10 mb-1'>
      <div className='flex justify-between items-center p-4 px-5'>
        <h1 className='text-[#FEFEFE] text-xl font-bold'>Project List</h1>
        <button className='py-[2px] rounded-md px-[8px] bg-[#6C2BD9] text-[#FEFEFE] text-sm font-semibold flex items-center' onClick={projectClick}><span className='text-xl pb-1'>+ </span> <p>New Project</p></button>
        {/* <Popup open={second} closeOnDocumentClick onClose={projectClick} position="right center">

        <PopupNewProject projectClick={projectClick} projectClic={projectClic}/>
      </Popup> */}
        {
          second && <PopupNewProject projectClick={projectClick} projectClic={projectClic}/>
        }

      </div>
      <div className=' max-h-[300px] scrolle overflow-auto'>

        <table className='w-[100%] min-w-[600px] text-[#9C9C9D] '>
            <thead className='text-sm h-9 border-b-[0.1px] border-[#51515161] '>
                <tr className='text-[13px]'>
                    <th className='w-[20%] text-left pl-5'>PROJECT</th>
                    <th>LEAD</th>
                    <th>DUE DATE</th>
                    <th>STATUS</th>
                    <th>PRIORITY</th>
                    <th>ACTION</th>
                </tr>

            </thead>
              
            <tbody className='h-12'>
                {
                  data.map((ele,i)=>(

                <tr key={i} className='border-b-[0.1px] border-[#51515161] text-[13px] font-medium'>

                    <td className='text-left pl-5 font-bold text-ellipsis overflow-clip hover:text-white'>
                  <NavLink to={`/projectdetails?id=${ele.id}`}>
                      {ele.projectName}
                  </NavLink>
                      </td>
                    <td className='text-center'>{ele.lead}</td>
                    <td className='text-center'>{ele.dueDate}</td>
                    <td className='text-center'>{ele.status}</td>
                    <td className='text-center'>{ele.priority}</td>
                    <td className='flex justify-center gap-3 items-center h-12 '>
                      <FaEdit className='text-[#9C9C9D] text-[15px] cursor-pointer' onClick={()=>{projectEditClick(ele)}}/>
                      {
                        isAdmin && <ImBin className='text-red-900 text-[15px] cursor-pointer' onClick={()=>handleDeletepr(ele.id)}/>
                      }
                    </td>
                    {third && <td>

                      {/* <EditPendingProject elem={ele} projectEditClick={projectEditClick}/> */}
                      <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
        <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
          onClick={projectEditClick}
        ></div>
        <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
          <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
            <div className="flex items-center w-[100%] justify-between text-white">
              <h1 className="text-2xl font-bold">Create Project</h1>

              <button onClick={projectEditClick}>
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
            <form action="" className="pt-2 flex flex-col gap-6 max-h-[500px] overflow-y-auto " onSubmit={(e)=>handleEditProject(e,editele.id)}>
                <label className="font-medium text-base flex flex-col gap-2" htmlFor="projectname">Project Name <input  className="py-2 px-4 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md text-sm font-normal text-[#ffffff]" placeholder='Enter project name' defaultValue={editele.projectName} type="text" /></label>
              <div className="flex flex-col gap-[5px]">
                
                <label className="font-medium text-base" htmlFor="taskDesc">
                  Project description
                </label>
                
                <textarea
                  className="rounded-md focus:outline-3 text-sm font-normal focus:outline-[#494b50] bg-[#24262D] p-2 px-3"
                  placeholder="Project description"
                  defaultValue={editele.projectDesc}
                  name="taskDesc"
                  id="taskDesc"
                  cols="30"
                  rows="4"
                  
                  
                  required
                ></textarea>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2" >
                {/* <label className="flex gap-2 items-center" >Lead
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " defaultValue={editele.lead} required name="employee" id="employee">
                  {
                    allEmployee.map((item,i)=>(

                      <option key={i} value={item.email}>{item.name}</option>
                    ))
                  }
                  
                </select>
                </label> */}
                <label className="flex gap-2 items-center" >Lead
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " defaultValue={ editele.email } required name="employee" id="employee">
                  {
                    projectLead.map((employee,i)=>(
                      
                      <option key={i} value={employee.email}>{employee.name}</option>

                    )

                    )
                  }
                  
                </select>
                </label>
                <label className="flex gap-2 items-center text-nowrap" >Due Date
                <input type="date" defaultValue={editele.dueDate} required className="py-1 date dark:fill-white px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "/>
                </label>
                
                    <label className="flex gap-2 items-center " >Priority
                    <input type="number" defaultValue={editele.priority} required className="py-1 px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "></input>
                    </label>
                
                <label className="flex gap-2 items-center" >Status
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " defaultValue={editele.status} required name="projects" id="projects">
                  <option value="Pending">Pending</option>
                  <option value="Complete">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
                </label>
              </div>
              <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]" >Create Project</button>
            </form>
          </div>
        </div>
      </div>
                    </td>
                      }
                </tr>
                  ))
                }
            </tbody>
        </table>
       
      </div>
    </section>
  )
}

export default PendingProjects
