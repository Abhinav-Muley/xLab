import React, { useState } from "react";
import Track from "../components/Track";
import PendingTask from "../components/PendingTask";
import PendingProjects from "../components/PendingProjects";
import Popup from "../components/Popup";
import { useAuthContext } from "../context/firebase-context";

function Home() {
  const [first, setfirst] = useState(false)
  const [second, setSecond] = useState(false)
  const { isAdmin, allTasks } = useAuthContext()
  const newTaskBtn = ()=>{
    
    setfirst(!first)
  }
  const newProjectBtn = ()=>{
    
    setSecond(!second)
  }
  const newProjectBt = ()=>{
    
    setSecond(false)
  }
  // console.log("home");

  return (
    <>
      <div className="bg-[#121317] ">
        <div className="max-w-[1500px] p-5 pt-7 mx-auto rounded-2xl">
          
         <Track/>
         <PendingTask first={first} taskClick={newTaskBtn}/>
         {allTasks.length ==0 ? <div className="flex justify-center text-[#ffffff96] text-xl font-semibold mt-5 "> <p> No Tasks Available</p></div>:null }
         {
          isAdmin &&  <PendingProjects second={second} projectClick={newProjectBtn} projectClic={newProjectBt} />
         }
        </div>
      </div>
    </>
  );
}

export default Home;
