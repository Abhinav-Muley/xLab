import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from '../context/firebase-context';
import { db } from '../firebase/firebase-initialize';
import { collection, getDocs, query, where } from 'firebase/firestore';
// import Warper from './Warper';

function PopupNewProject({setData,projectClick,projectClic, ele}) {
  const {addProject, allEmployee, currentUser} = useAuthContext()
  const createNewProject = (e)=>{
    e.preventDefault()
    
    addProject(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value, e.target[5].value)
    // console.log(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value, e.target[5].value)
    projectClic()
  }
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
console.log(currentUser.email);
 
  // console.log("inside project popup");
  return (
    // <div className='fixed top-[80px] left-0 right-0 mx-10'>
      <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
        <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
          onClick={projectClick}
        ></div>
        <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
          <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
            <div className="flex items-center w-[100%] justify-between text-white">
              <h1 className="text-2xl font-bold">Create Project</h1>
          
    {/* <div>Popup content here !!</div> */}

              <button onClick={projectClick}>
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
            <form action="" className="pt-2 flex flex-col gap-6 max-h-[500px] px-1 overflow-y-auto" onSubmit={(e)=>{createNewProject(e)}}>
                <label className="font-medium text-base flex flex-col gap-2" htmlFor="projectname">Project Name <input id='projectname' className="py-2 px-4 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md text-sm font-normal text-[#ffffff]" required placeholder='Enter project name' type="text" /></label>
              <div className="flex flex-col gap-[5px]">
                
                <label className="font-medium text-base" htmlFor="taskDesc">
                  Project description
                </label>
                <textarea
                  className="rounded-md focus:outline-3 focus:outline-[#494b50] bg-[#24262D] p-2 px-3"
                  placeholder="Project description"
                  name="taskDesc"
                  id="taskDesc"
                  cols="30"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2" >
                <label className="flex gap-2 items-center" >Lead
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " defaultValue={ currentUser.email } required name="employee" id="employee">
                  {
                    projectLead.map((employee,i)=>(
                      
                      <option key={i} value={employee.email}>{employee.name}</option>

                    )

                    )
                  }
                  
                </select>
                </label>
                <label className="flex gap-2 items-center text-nowrap" >Due Date
                <input type="date"  required className="py-1 date dark:fill-white px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "/>
                </label>
                {/* <label className="flex gap-2 items-center  text-nowrap" id="employee" >Tech Stack
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md"  required name="employee" id="employee">
                <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Devops">Devops</option>
                </select>
                </label> */}
                {/* <input type="number" className="py-1 px-2 w-full border bg-[#24262D] border-[#494b50] rounded-md "></input> */}
                    <label className="flex gap-2 items-center " >Priority
                    <input type="number" required className="py-1 px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "></input>
                    </label>
                
                <label className="flex gap-2 items-center" >Status
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " required name="projects" id="projects">
                  <option value="Pending">Pending</option>
                  <option value="Complete">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
                </label>
              </div>
              <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]">Create Project</button>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default PopupNewProject
