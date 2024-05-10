import React, { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/firebase-context";
import { db, tasks } from "../firebase/firebase-initialize";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";


function PendingTask({ taskClick, first }) {
  // const [tasksArr, setTasksArr] = useState([])
  const {name, deletedoc, currentUser, isAdmin, allTasks,getAllTasks} = useAuthContext()
  const [second, setSecond] = useState(false);
  
  const [data, setData] = useState([]);
  const [editEle, setEditEle] = useState([]);
  useEffect(() => {
    let inCompleteTasks = []
    allTasks.map((item,i)=>{
      if(item.status != "Complete"){
        inCompleteTasks.push({...item,id:item.id})
        // console.log(item.id);
      }
    })
    setData(inCompleteTasks)
  }, [allTasks])
  
  // getAllTasks()
  // useEffect(() => {
    // const fetchData = async (name) => {
    // let taskCount = 0
    // let taskPending = 0
    // let taskOnHold = 0
    //  const dbas = collection(db, "tasks"); // Replace "your-collection-name" with your actual collection name
    //  const querySnapshot = await getDocs(dbas);
    //  const fetchedData = [];
    //  querySnapshot.forEach((doc) => {
    //   //  if((doc.data().caller == name || doc.data().employee == name) && doc.data().status !== "Complete"){
    //   //   console.log(name );

    //   //  fetchedData.push({...doc.data(),id:doc.id});
    //   //  taskCount++;
    //   //  if(doc.data().status == "Pending"){
    //   //   taskPending++;
    //   //  }else if(doc.data().status == "On Hold"){
    //   //   taskOnHold++;
    //   //  }
    //   // }
    //   if(doc.data().status != "Complete"){

    //     if(isAdmin){
    //       // console.log(name );
  
    //      fetchedData.push({...doc.data(),id:doc.id});
    //      taskCount++;
    //      if(doc.data().status == "Pending"){
    //       taskPending++;
    //      }else if(doc.data().status == "On Hold"){
    //       taskOnHold++;
    //      }
    //     }else if(doc.data().caller == name || doc.data().employee == name){
    //       fetchedData.push({...doc.data(),id:doc.id});
    //       taskCount++;
    //       if(doc.data().status == "Pending"){
    //        taskPending++;
    //       }else if(doc.data().status == "On Hold"){
    //        taskOnHold++;
    //       }

    //     }
    //   }
    //  });
    //  setData(fetchedData);
    //  setTaskCount([taskOnHold,taskPending,taskCount])
  //  };
// console.log("calling all tasks");
  //  fetchData(name);
//  }, [name, first]);
//  console.log(data);
  // let arr = [1, 1, 1, 1, 1];

  const handleDelete = (id)=>{
    let isConfirm = confirm("Your task will be deleted!")
    if(isConfirm){
      deletedoc(id)
    }
  }
  const handleEditForm = async(e,id)=>{
    e.preventDefault()
    const q = doc(db, "tasks", id);  
    await updateDoc(q, {
      // duedate: e.target[0].value,
      status: e.target[0].value,
      // priority: e.target[2].value,
    });

    // console.log(e.target[0].value,e.target[1].value,e.target[2].value);
    // location.reload();
    getAllTasks(currentUser)
    setSecond(!second)

  }
  // console.log("pending tasks");


  return (
    <section className="bg-[#1A1C23]  rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 px-5">
        <h1 className="text-[#FEFEFE] text-xl font-bold">Task List</h1>
        {
          isAdmin && 
        <button
          className="py-[2px] rounded-md px-[8px] bg-[#6C2BD9] text-[#FEFEFE] text-sm font-semibold flex items-center"
          onClick={taskClick}
        >
          <span className="text-xl pb-1">+ </span> <p>New Task</p>
        </button>
        }
        {first && <Popup first={first} taskClick={taskClick} />}
      </div>
      <div className=" max-h-[300px] overflow-auto scrolle">
        <table className="w-[100%] min-w-[600px] text-[#9C9C9D] ">
          <thead className="text-sm h-9 border-b-[0.1px] border-[#51515161] ">
            <tr className="text-[13px]">
              <th className="w-[30%] text-left pl-5">TASK</th>
              <th>ENDS IN</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
              <th>PRIORITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          
          <tbody className=" max-h-[100px]">

            {

              data.map((i,index)=>(
                <tr key={index } className="border-b-[0.1px] border-[#51515161] text-[13px] font-medium">
                <td className="text-left pl-5 text-ellipsis max-w-0 overflow-clip font-bold hover:text-white">
                  <NavLink to={`/taskdetails?id=${i.id}`}>

                  {i.taskDesc}
                  </NavLink>
                </td>
                {/* <td className="text-center">{i.startdate}</td> */}
                <td className="text-center">{
                 
                 (!(new Date(i.startdate) instanceof Date) || isNaN(new Date(i.startdate).getTime()) ||
                 !(new Date(i.duedate) instanceof Date) || isNaN(new Date(i.duedate).getTime())) ?  "ERROR" :
                    (Math.floor(Math.abs( new Date(i.startdate).getTime() - new Date(i.duedate).getTime() )) / (1000 * 60 * 60 * 24)) 
                  
                }</td>
                
                <td className="text-center">{i.duedate}</td>
                <td className="text-center">{i.status}</td>
                <td className="text-center">{i.priority}</td>
                <td className="flex justify-center gap-3 items-center h-12 ">
                  <FaEdit
                    className="text-[#9C9C9D] text-[15px] cursor-pointer"
                    onClick={() => {setSecond(!second); setEditEle(i)}}
                  />
                  {
                    isAdmin && <ImBin className="text-red-900 text-[15px] cursor-pointer" onClick={()=>handleDelete(i.id)} />
                  }
                </td>
              {second && (
                <td>
                <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
                  <div
                    className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
                    onClick={() => setSecond(!second)}
                  ></div>
                  <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
                    <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
                      <div className="flex items-center w-[100%] justify-between text-white">
                        <h1 className="text-2xl font-bold">Edit Task</h1>

                        <button onClick={() => setSecond(!second)}>
                          <IoMdClose className="text-white text-xl" />
                        </button>
                      </div>
                      <form
                        action=""
                        className="flex flex-col items-center gap-5 max-h-[500px] overflow-y-auto"
                        onSubmit={(e)=>handleEditForm(e,editEle.id)}
                      >
                        <div className="pt-2 flex gap-6 justify-center flex-wrap">
                          {/* <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                            Due Date
                            <input
                              className="bg-[#24262D] w-full py-1 date px-4 border border-[#ffffff80] rounded-md"
                              type="date"
                              defaultValue={editEle.duedate}
                            />
                          </label> */}
                          <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                            Status
                            <select
                              className="py-2 px-2 w-full text-sm border min-w-[200px]  bg-[#24262D] border-[#494b50] rounded-md "
                              required
                              name="projects"
                              id="projects"
                              defaultValue={editEle.status}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Complete">Complete</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                          </label>
                          {/* <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                            Priority
                            <input
                              className="bg-[#24262D] w-full py-2 px-4 border border-[#ffffff80] rounded-md"
                              type="number"
                              defaultValue={editEle.priority}
                            />
                          </label> */}
                        </div>
                        <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                </td>
              )}
              </tr>

              ))
            }

            {/* {arr.map((item,i) => (
              // <div key={i}>
                <tr key={i} className="border-b-[0.1px] border-[#51515161] text-[13px] font-medium">
                  <td className="text-left pl-5 font-bold">
                    <NavLink to={"/taskdetails"}>

                    Add delete button
                    </NavLink>
                  </td>
                  <td className="text-center">2024-2-20</td>
                  <td className="text-center">2024-5-20</td>
                  <td className="text-center">Pending</td>
                  <td className="text-center">1</td>
                  <td className="flex justify-center gap-3 items-center h-12 ">
                    <FaEdit
                      className="text-[#9C9C9D] text-[15px] cursor-pointer"
                      onClick={() => setSecond(!second)}
                    />
                    <ImBin className="text-red-900 text-[15px] cursor-pointer" />
                  </td>
                {second && (
                  <td>
                  <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
                    <div
                      className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
                      onClick={() => setSecond(!second)}
                    ></div>
                    <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0">
                      <div className="p-6 bg-[#1A1C23] rounded-md text-[#E5E7EB]">
                        <div className="flex items-center w-[100%] justify-between text-white">
                          <h1 className="text-2xl font-bold">Edit Task</h1>

                          <button onClick={() => setSecond(!second)}>
                            <IoMdClose className="text-white text-xl" />
                          </button>
                        </div>
                        <form
                          action=""
                          className="flex flex-col items-center gap-5 max-h-[500px] overflow-y-auto"
                        >
                          <div className="pt-2 flex gap-6 justify-center flex-wrap">
                            <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                              Due Date
                              <input
                                className="bg-[#24262D] w-full py-1 date px-4 border border-[#ffffff80] rounded-md"
                                type="date"
                              />
                            </label>
                            <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                              Status
                              <select
                                className="py-2 px-2 w-full text-sm border min-w-[200px]  bg-[#24262D] border-[#494b50] rounded-md "
                                required
                                name="projects"
                                id="projects"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                              </select>
                            </label>
                            <label htmlFor="" className="flex gap-4 text-nowrap items-center">
                              Priority
                              <input
                                className="bg-[#24262D] w-full py-2 px-4 border border-[#ffffff80] rounded-md"
                                type="number"
                              />
                            </label>
                          </div>
                          <button className="py-1 px-10 bg-[#6C2BD9] font-medium text-sm rounded-md self-center max-w-[200px]">
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  </td>
                )}
                </tr>
              // </div>
            ))} */}
            
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PendingTask;
