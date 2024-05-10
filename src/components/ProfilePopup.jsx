import React, { useEffect, useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { LuPhone } from 'react-icons/lu'
import { MdOutlineEmail } from 'react-icons/md'
import { PiBuildingsBold } from 'react-icons/pi'
import { db } from '../firebase/firebase-initialize'
import { collection, doc, query, updateDoc, where } from 'firebase/firestore'
import { useAuthContext } from '../context/firebase-context'



function ProfilePopup({ ele, setfirst }) {
  const { isAdmin, name, getAllEmployeeProfiles, currentUser, geturl } = useAuthContext()
  const [editProfile, setEditProfile] = useState(true)
  // const {geturl} = useAuthContext()
  const [urlprofile, setUrl] = useState("https://imgs.search.brave.com/Yc_k7oNnrlNy35kM5Zdq6JVEFB1YnbgR2xPUyKCJYh0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYWxlLWZlbWFs/ZS1wcm9maWxlLWF2/YXRhci11c2VyLWF2/YXRhcnMtZ2VuZGVy/LWljb25zXzEwMjA4/NjctNzUwOTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc")
  useEffect(() => {

    const fetchdata = async () => {
      const urlpic = await geturl(ele.email)
      // console.log(urlpic);
      setUrl(urlpic)
    }
    // if(ele && urlprofile === "https://imgs.search.brave.com/Yc_k7oNnrlNy35kM5Zdq6JVEFB1YnbgR2xPUyKCJYh0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYWxlLWZlbWFs/ZS1wcm9maWxlLWF2/YXRhci11c2VyLWF2/YXRhcnMtZ2VuZGVy/LWljb25zXzEwMjA4/NjctNzUwOTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc"){

    // }
    if (ele) {

      fetchdata()
    }

  }, [ele])

  const handleUpdate = async (e, mail, id) => {
    e.preventDefault()
    let a = document.getElementsByName("is-active");
    // console.log(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value);
    console.log(e.target[1].value,e.target[2].value,e.target[5].value,e.target[7].value,e.target[8].value);
    // console.log(mail,id );
    // return;
    const q = doc(db, "users", id);
    // if(a[0].checked === true){
    const data = await updateDoc(q, {
      name: e.target[1].value,
      designation: e.target[2].value,
      disable: a[1].checked,
      techstack: e.target[5].value,
      phone: e.target[7].value,
      address: e.target[8].value
    });
    // console.log(data);
    // }
    // else if(a[1].checked === true){
    //   await updateDoc(q, {
    //     disable: true,
    //     name: e.target[1].value,
    //     designation: e.target[2].value,
    //     // email: e.target[5].value,
    //     phone: e.target[6].value,
    //     address: e.target[7].value
    //   });

    // }

    getAllEmployeeProfiles(currentUser)
    alert("Changes Saved!")
    setfirst(null)
    setEditProfile(true)

  }
  // console.log("profile popup");
  if (!ele)
    return <></>


  return (
    <div className="fixed top-[80px] p-2 right-0 left-[250px] max-sm:left-0 bottom-0 backdrop-blur-lg ">
      <div
        className="fixed top-0 p-2 right-0 left-0 max-sm:left-0 bottom-0 bg-[#00000023] backdrop-blur-lg "
        onClick={() => { setfirst(null); setEditProfile(true) }}
      ></div>
      {
        editProfile ?
          <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0 ">
            <div className="p-6 bg-[#1A1C23] flex flex-col gap-3 rounded-md max-h-[580px] overflow-y-auto text-[#E5E7EB] ">
              <div className="flex items-center w-[100%] justify-between text-white">
                <h1 className="text-2xl font-bold ">Information</h1>


                <button onClick={() => { setfirst(null); setEditProfile(true) }}>
                  <IoMdClose className="text-white text-xl" />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 ">
                <div className=" flex flex-col items-center gap-1 justify-center max-w-[400px] mx-auto py-4 grow shrink  ">
                  <img className='rounded-full w-[150px] h-[150px] object-cover' src={urlprofile} alt="" />
                  <div className='text-center'>

                    <h1 className='text-xl font-bold'>{ele.name}</h1>
                    <p className='text-xs text-[#ffffff81] '>{ele.designation}</p>
                    {/* <input type="radio" value="online"  defaultChecked name="is-active" id="is-active k" />   */}
                  </div>

                  {ele.disable ? <p>{ele.profile} - Offline</p> : <p className='' >{ele.profile} - Online</p>}
                  <p>{ele.techstack}</p>
                </div>
                <div className="grow shrink basis-[400px]   flex gap-2 flex-col">
                  <h1 className='text-[#DFE7EB] text-xl font-semibold'>Personal Information</h1>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <MdOutlineEmail className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <p className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] '>{ele.email}</p></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <LuPhone className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <p className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] '>{ele.phone}</p></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <FiHome className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <p className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] '>{ele.address}</p></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <PiBuildingsBold className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <p className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] '>xScietist</p></div>
                </div>

              </div>
              {
                isAdmin && ele.name != name && <button type='button' className='bg-[#d92b2b] max-w-[150px] py-1 px-6 rounded-md self-center text-base font-semibold' onClick={() => setEditProfile(false)} >Edit Profile</button>
              }
            </div>
          </div>

          :

          <div className="max-w-[1500px] absolute right-0 left-0 px-2 mx-auto max-sm:left-0 ">
            <form className="p-6 bg-[#1A1C23] flex flex-col gap-3 rounded-md max-h-[580px] overflow-y-auto text-[#E5E7EB] " onSubmit={(e) => {

              handleUpdate(e, ele.email, ele.id);

            }} >
              <div className="flex items-center w-[100%] justify-between text-white">
                <h1 className="text-2xl font-bold ">Information</h1>


                <button onClick={() => { setfirst(null); setEditProfile(true) }}>
                  <IoMdClose className="text-white text-xl" />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 ">
                <div className=" flex flex-col items-center gap-1 justify-center max-w-[400px] mx-auto py-4 grow shrink  ">
                  <img className='rounded-full w-[150px] h-[150px] object-cover' src={urlprofile} alt="" />
                  <div className='text-center'>

                    <input className='text-xl font-bold bg-[#1A1C23] text-center border-[#656565b9] border-2 my-1 rounded-lg' defaultValue={ele.name} />
                    <input className='text-xl font-bold bg-[#1A1C23] text-center border-[#656565b9] border-2 rounded-lg' defaultValue={ele.designation} />
                    {/* <p className='text-xs text-[#ffffff81] '>{ele.designation}</p> */}
                    {/* <input type="radio" value="online"  defaultChecked name="is-active" id="is-active k" />   */}
                  </div>
                  {
                    isAdmin && ele.name !== name && (
                      <div className='flex gap-2' id='form'>
                        {/* Online */}
                        <label htmlFor="is-active-k" className='flex items-center gap-1 text-[#ffffff81] text-[13px] font-normal'>
                          Online
                          <input
                            type="radio"
                            value="online"
                            name="is-active"
                            id="is-active-k"
                            defaultChecked={!ele.disable}
                          />
                        </label>

                        {/* Offline */}
                        <label htmlFor="is-active-kk" className='flex items-center gap-1 text-[#ffffff81] text-[13px] font-normal'>
                          Offline
                          <input
                            type="radio"
                            value="offline"
                            name="is-active"
                            id="is-active-kk"
                            defaultChecked={ele.disable}
                          />
                        </label>
                      </div>
                    )
                  }
                  <select name="profile" id="profile" defaultValue={ele.techstack} required className='bg-[#1A1C23] outline-none border m-1 p-1 rounded-md border-[#505153]'>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend" >Backend</option>
                    <option value="Devops">Devops</option>
                    <option value="Full Stack">Full Stack</option>
                  </select>
                </div>
                <div className="grow shrink basis-[400px]   flex gap-2 flex-col">
                  <h1 className='text-[#DFE7EB] text-xl font-semibold'>Personal Information</h1>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <MdOutlineEmail className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <input className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] w-full bg-[#1A1C23] outline-none ' readOnly defaultValue={ele.email} /></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <LuPhone className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <input className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] w-full bg-[#1A1C23] outline-none  ' defaultValue={ele.phone} /></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <FiHome className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <input className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] w-full bg-[#1A1C23] outline-none  ' defaultValue={ele.address} /></div>
                  <div className='flex items-center border-2 w-full border-[#656565b9] rounded-lg overflow-hidden'> <PiBuildingsBold className='w-5 h-5 p-3 box-content text-[#C7CFD3] bg-[#24262D]' /> <p className='border-l px-5 border-[#656565b9] p-[10px] text-[#919091] w-full bg-[#1A1C23] outline-none  '>xScietist</p></div>
                </div>

              </div>
              {
                isAdmin && ele.name != name && <button type='submit' className='bg-[#6C2BD9] max-w-[150px] py-1 px-6 rounded-md self-center text-base font-semibold' >Save Changes</button>
              }
            </form>
          </div>

      }
    </div>
  )
}

export default ProfilePopup
