import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from "../context/firebase-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-initialize";

function Popup({first, taskClick }) {
  // const [employee, setEmployee] = useState();
  const {addTask, name, allEmployee, allProjects, deleteProject,getAllProjects, currentUser} = useAuthContext()
  // console.log(allProjects);
  const handleNewTask = (e)=>{
    e.preventDefault()
    taskClick()
    // console.log(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value,e.target[5].value,e.target[6].value);
    addTask(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value,e.target[5].value,e.target[6].value)
  }
  const  [inCompletePr, setInCompletePr] = useState([])
  useEffect(() => {
    const empp = []
    const fetchedData = async()=>{

    allProjects.map((item)=>{
      if(item.status != "Complete" && item.lead == currentUser.email){

        empp.push(item)
      }
    })
   

    setInCompletePr(empp)
    }
    fetchedData()
  
    // console.log("inside popup");
  }, [allProjects])
  // console.log(currentUser.email);
  const  [techEmployees, setTechEmployees] = useState([])
  useEffect(() => {
    const empp = []
    const fetchedData = async()=>{
    const q = query(collection(db, "users"), where("techstack", "==", "Frontend"), where("profile", "==", "employee"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      empp.push({...doc.data(), id:doc.id})
    });
    // console.log(empp);

    setTechEmployees(empp)
    }
    fetchedData()
  }, [allEmployee])
  
  const handleTechStackChange = async(e )=>{
    // console.log("sdfkjn");
    // console.log(e);
    const empp = []
    const q = query(collection(db, "users"), where("techstack", "==", e), where("profile", "==", "employee"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      empp.push({...doc.data(), id:doc.id})
    });
    // console.log(empp);
    setTechEmployees(empp)
  }
  
  return (
    <>
      {/* <div className='fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ' onClick={taskClick}>
      <div className='max-w-[1500px] max-sm:left-0 z-20' onClick={(e)=>{e.stopPropagation()}}>
        <div className='p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]'>

        <div className='flex items-center w-[100%] justify-between text-white'>

         <h1 className='text-2xl font-bold'>Create Task</h1>
         
        <button onClick={taskClick}>

         <IoMdClose className='text-white text-xl'/>
        </button>
         
        </div>
        <form action="" className='pt-2 '>
            <div className='flex flex-col gap-1'>
                <label className='font-medium text-base' htmlFor="taskDesc">Task description</label>
                <textarea className='rounded-md border-[#494b50] border-2 bg-[#24262D] p-2 px-3' placeholder='Task description' name="taskDesc" id="taskDesc" cols="30" rows="4"></textarea>
            </div>
        </form>
        </div>
      </div>
        </div> */}

      <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
        <div
          className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
          onClick={taskClick}
        ></div>
        <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
          <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
            <div className="flex items-center w-[100%] justify-between text-white">
              <h1 className="text-2xl font-bold">Create Task</h1>

              <button onClick={taskClick}>
                <IoMdClose className="text-white text-xl" />
              </button>
            </div>
            <form action="" className="pt-2 flex flex-col gap-6 max-h-[500px] overflow-y-auto" onSubmit={(e)=> handleNewTask(e)}>
              <div className="flex flex-col gap-[5px]">
                <label className="font-medium text-base" htmlFor="taskDesc">
                  Task description
                </label>
                <textarea
                  className="rounded-md mx-1 border-[#494b50] outline-0 outline-transparent focus:outline-[3px] focus:outline-[#414246] border-2 bg-[#24262D] p-2 px-3"
                  placeholder="Task description"
                  name="taskDesc"
                  id="taskDesc"
                  cols="30"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2" >
                <label className="flex gap-2 items-center" >Caller
                <input className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " defaultValue={currentUser.email}  readOnly />
                </label>
                {/*<input type="date"  defaultValue={ new Date().toJSON().slice(0,10)}  required className="py-1 date px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "/>
                 */}
                 <label className="flex gap-2 items-center text-nowrap" >Tech Stack
                <select name="profile" id="profile" required className='py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md ' onChange={(e)=>{handleTechStackChange(e.target.value)}} >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Devops">Devops</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                </label>
                <label className="flex gap-2 items-center " >Priority
                <input type="number" required className="py-1 px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "></input>
                </label>
                <label className="flex gap-2 items-center  " id="employee" >Employee
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " required name="employee" id="employee"  >
                  {
                    techEmployees.map((employee, index)=>(

                      <option key={index} value={employee.email} >{employee.name}</option>
                    )

                    )
                  }
                  
                </select>
                {/* <input type="number" className="py-1 px-2 w-full border bg-[#24262D] border-[#494b50] rounded-md "></input> */}
                </label>
                <label className="flex gap-2 items-center text-nowrap" >Due Date
                <input type="date" required className="py-1 date px-2 min-w-[100px] w-full border bg-[#24262D] border-[#494b50] rounded-md "></input>
                </label>
                <label className="flex gap-2 items-center" >Projects
                <select className="py-1 px-2 w-full border min-w-[100px] bg-[#24262D] border-[#494b50] rounded-md " required name="projects" id="projects">
                  {
                    inCompletePr.map((pr,index)=>(

                      <option key={index} value={pr.projectName} >{pr.projectName}</option>
                    ))
                  }
                  
                </select>
                </label>
              </div>
              <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]">Create Task</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
