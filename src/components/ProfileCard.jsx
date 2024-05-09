import { doc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/firebase-context';

function ProfileCard({ele, setEle}) {
    const {geturl} = useAuthContext()
    const [urlprofile, setUrl] = useState("https://imgs.search.brave.com/Yc_k7oNnrlNy35kM5Zdq6JVEFB1YnbgR2xPUyKCJYh0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYWxlLWZlbWFs/ZS1wcm9maWxlLWF2/YXRhci11c2VyLWF2/YXRhcnMtZ2VuZGVy/LWljb25zXzEwMjA4/NjctNzUwOTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc")
    useEffect(() => {
        const fetchdata = async()=>{
            const urlpic = await geturl(ele.email)
            console.log( urlpic);
            setUrl(urlpic)
        }
        fetchdata()
      
    }, [])  
  return (
    <div className="text-[#E5E7EB] bg-[#1A1C23] flex flex-col min-w-[200px] max-w-[300px] p-4 gap-3 justify-center items-center rounded-lg ">
          
          
            <img src={urlprofile} alt="" className='w-28 h-28 aspect-square rounded-full object-cover' />
            <div className='leading-6'>

            <h3 className='text-[17px] font-bold text-center'>{ele.name}</h3>
            <p className='text-xs opacity-55 text-center'>{ele.designation}</p>
            </div>
            <button className=' bg-[#6C2BD9] w-[100%] rounded-md p-[2px] py-1 text-sm font-semibold' onClick={()=>{setEle(ele)}}>View Profile</button>
        </div>
  )
}

export default ProfileCard
