import React, { useEffect, useMemo, useState } from 'react'
import ProfileImg from "../assets/profile.jpeg"
import { IoMdClose } from 'react-icons/io'
import Profilep from "../assets/profile.jpeg"
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { PiBuildingsBold } from "react-icons/pi";
import Newemployee from '../components/Newemployee';
import { useAuthContext } from '../context/firebase-context';
import { collection, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-initialize';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Popup from 'reactjs-popup';
import ProfilePopup from "../components/ProfilePopup"
import ProfileCard from '../components/ProfileCard';
// import profilePopup from '../components/ProfilePopup';



function Profile() {
  // console.log("profile");
  // let array = [1,1,1,1,1,1,1,2]
  const [first, setfirst] = useState(false)
  const [Second, setSecond] = useState(false)
  const [ele, setEle] = useState(null)
  const handlesecond = () => {
    setSecond(!Second)
  }

  const { name, setIsAdmin, isAdmin, loggedIn, allEmployee, currentUser } = useAuthContext()
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = ()=>{
    const emp = [];
    if (isAdmin) {

      allEmployee.map((item) => {
        emp.push(item)
        
      })
    } else {
      allEmployee.map((item) => {
          if (item.email == currentUser.email) {
          emp.push(item)
        }
        
        })

    }
    setData(emp)
    // console.log(emp.length, allEmployee.length);

  }, [allEmployee])
  // console.log(data);

  // console.log(data);
  return (
    <div className='p-8 max-w-[1500px] bg-[#121317] mx-auto'>
      <h1 className='text-[#E5E7EB] text-[26px] font-bold'>Employee Profile</h1>
      <div className='mt-4 grid gap-4 ' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)" }}>
        {
          data.map((ele, i) => (
            <ProfileCard key={i} ele={ele} setEle={setEle} />
          ))
        }
        {<ProfilePopup ele={ele} setfirst={setEle} />}

        {
          isAdmin && <>
            <div className="bg-[#1A1C23] p-4 text-[#414246] rounded-lg h-[232px]">

              <div className="text-[#6c6c6c] cursor-pointer bgg h-full bg-[#1A1C23] w-full  flex flex-col min-w-[200px] p-4 gap-3 justify-center items-center rounded-lg text-3xl  " onClick={handlesecond}>    +  </div>
            </div>
          </>
        }
        {
          Second &&
          <Newemployee second={Second} handlesecond={handlesecond} />
        }
      </div>
    </div>
  )
}

export default Profile
