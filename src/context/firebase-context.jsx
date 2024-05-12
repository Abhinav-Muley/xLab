import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { deleteDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, doc, addDoc, getDocs } from "firebase/firestore";
import { auth, app, db, storage, tasks } from "../firebase/firebase-initialize";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyC0njJDuPUkvSD21QbtYXBx-Buj1-vRhdU",
//   authDomain: "xlab-ee9ce.firebaseapp.com",
//   projectId: "xlab-ee9ce",
//   storageBucket: "xlab-ee9ce.appspot.com",
//   messagingSenderId: "39194323423",
//   appId: "1:39194323423:web:08b728a67c68199cc37c6a",
//   measurementId: "G-16MPGHFC6H"
// };
// // Initialize Firebase outside of the component
// // const firebaseConfig = { /* Your Firebase config */ };
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const cartt = useContext(AuthContext);
  return cartt
}

export const AuthContextProvider = (props) => {

  const [loginLoader, setLoginLoader] = useState(false)
  const [userLoader, setUserLoader] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [allTasks, setAllTasks] = useState([]);
  const [taskCount, setTaskCount] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false)
  const [allEmployee, setAllEmployee] = useState([])
  const [allProjects, setAllProjects] = useState([])
  // const [allEmployeeProfile, setAllEmployeeProfile] = useState([])
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe
  }, [isAdmin])

  async function initializeUser(user) {
    if (user) {
      setLoginLoader(true)

      console.log("log place 1");
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot1 = await getDocs(q);
      querySnapshot1.forEach((doc) => {
        if (doc.data().disable == true) {

          signOut(auth).then(() => {

            // Sign-out successful.

          }).catch((error) => {
            // An error happened.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage)
          });
          alert("Your Account is Disable! \nKindly Contact your admin")
          location.reload();
        } else {
      console.log("log place 2");

          setname(doc.data().name)
          setCurrentUser({ ...user })
          setLoggedIn(true)
          if(doc.data().profile == "admin"){
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }
      console.log("log place 3");

        }
      });
      
      console.log("log place 4");
try {
  
  const storage = getStorage();
  getDownloadURL(ref(storage, `userProfile/${user.email}/profile.jpg`))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'
    setUrl(url)
    
  })
  .catch((error) => {
    // Handle any errors
  });
} catch (error) {
  
}
      // const dbas = collection(db, "users");
      //   const querySnapsho = await getDocs(dbas);

      //   // Array to store promises for all URL retrievals


      getAllEmployeeProfiles(user)
      getAllTasks(user)
      getAllProjects(user)
    } else {
      setCurrentUser(null)
      setLoggedIn(false)
    }
    console.log("log place 5");
    
    console.log("log place 6");
    setLoginLoader(false)
  }
  const getAllEmployeeProfiles = async (user) => {
    try {
      const dbas = collection(db, "users");
      const querySnapsho = await getDocs(dbas);

      // Array to store promises for all URL retrievals
      console.log("employee profile");
      let allUsers = []
      querySnapsho.forEach((doc) => {
        // if (doc.data().email === user.email && doc.data().profile === "admin") {
        //   // setIsAdmin(true)
        allUsers.push({ ...doc.data(), id: doc.id , url:"https://picsum.photos/200/200"})
        // }
        console.log("=====> for each",doc.id);
      });
      console.log(allUsers);
    //   getDownloadURL(ref(storage, `userProfile/${doc.data().email}/profile.jpg`))
    //  .then((url) => {
    //    console.log("====> getDownloadURL",url);
    //    // `url` is the download URL for 'images/stars.jpg'
       
    
    //  })
    //  .catch((error) => {
    //    // Handle any errors
    //  });
      setAllEmployee(allUsers)
      
      
    } catch {
      
    }
  }
  const geturl = async(email)=>{
    // const storage = storage;
        var profileUrl =""
      await  getDownloadURL(ref(storage, `userProfile/${email}/profile.jpg`))
        .then((url) => {
            console.log("====> getDownloadURL",url);
            // `url` is the download URL for 'images/stars.jpg'
            profileUrl = url
            
            
        })
        .catch((error) => {
            // Handle any errors
        });
        return profileUrl
  }
  const getAllTasks = async (user) => {

    // try {

      let taskCount = 0
      let taskPending = 0
      let taskOnHold = 0
      console.log("all tasks");
      // const q = query(collection(db, "tasks"), where("capital", "==", true));
      const fetchedData = [];
      if (isAdmin) {
        const databaase = collection(db, "tasks"); // Replace "your-collection-name" with your actual collection name
        const Snapshot = await getDocs(databaase);
        Snapshot.forEach((doc) => {



          // console.log(name );

          fetchedData.push({ ...doc.data(), id: doc.id });
          if (doc.data().status == "Pending") {
            taskCount++;
            taskPending++;
          } else if (doc.data().status == "On Hold") {
            taskOnHold++;
            taskCount++;
          }

        });
      } else {
        const q = query(collection(db, "tasks"), where( "employee", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          fetchedData.push({ ...doc.data(), id: doc.id });
          if (doc.data().status == "Pending") {
            taskCount++;
            taskPending++;
          } else if (doc.data().status == "On Hold") {
            taskCount++;
            taskOnHold++;
          }
        });
      }
      setAllTasks(fetchedData);
      setTaskCount([taskOnHold, taskPending, taskCount])

    // } catch (error) {

    // }
  }
  const getAllProjects = async (user) => {
    try {
      // let totalprojectcount = 0
      var allProjects = []
      console.log("all projects");
      if (isAdmin) {

        const dba = collection(db, "Projects");
        const querySnapsh = await getDocs(dba);
        querySnapsh.forEach((doc) => {
          allProjects.push({ ...doc.data(), id: doc.id })
          // totalprojectcount++;
        });
      } 
      // else {
      //   const q = query(collection(db, "Projects"), where("lead", "==", user.email));

      //   const querySnapshot = await getDocs(q);
      //   querySnapshot.forEach((doc) => {
      //     allProjects.push({ ...doc.data(), id: doc.id })
      //     // totalprojectcount++;
      //   });
      // }

      setAllProjects(allProjects)

      // setProjectCount(totalprojectcount)

      // }else if(doc.data().lead == name){

      //     allProjects.push(doc.data().projectName)

      //   }
      //   // allProjects.push(doc.data().projectName)
      // }
      // if(auth){


      //   // Array to store promises for all URL retrievals

      //       setAllProjects(allProjects)
      // }
    } catch {

    }

  }


  const doCreateUser = async (e, img) => {
    e.preventDefault()
    setUserLoader(true);
    var profile = e.target[2].value
    var techstack = e.target[3].value
    var name = e.target[4].value
    var email = e.target[5].value
    var phone = e.target[6].value
    var designation = e.target[7].value
    var address = e.target[8].value
    var password = e.target[5].value
    var img = img
    console.log(profile, techstack,name, email, phone, designation, address, password, img);
    console.log(auth.currentUser.email);
    let adminmail = auth.currentUser.email
    let adminpassword = prompt("Enter your password")
    var cUser
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // console.log(auth);
        // Signed up 
        cUser = auth.currentUser
        const user = userCredential.user;
        const storageRef = ref(storage, `userProfile/${email}/profile.jpg`);
        await uploadBytes(storageRef, img).then((snapshot) => {
          // console.log('Uploaded a blob or file!');
        });
        try {
          const docRef = await addDoc(collection(db, "users"), {
            profile: profile,
            techstack: techstack,
            name: name,
            email: email,
            phone: phone,
            designation: designation,
            address: address,
            disable: false
          });
          // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        // ...  
        alert("User Created!")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        // ..
      });

    await signOut(auth).then(() => {
      setLoggedIn(false)

    }).catch((error) => {
      // An error happened.
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage)
    });

    await signInWithEmailAndPassword(auth, adminmail, adminpassword)
      .then((userCredential) => {

        setLoggedIn(true)

        // Handle successful sign-in
        const user = userCredential.user;

      })
      .catch((error) => {
        // Handle sign-in errors
        let errorCode = error.code;
        let errorMessage = error.message;

      });
    getAllEmployeeProfiles()
    // location.reload();
    setUserLoader(false)

  }
  const doSignInWithEmailAndPassword = (email, password) => {
    setLoginLoader(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        setLoggedIn(true)
        const user = userCredential.user;


      })
      .catch((error) => {
        // Handle sign-in errors
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("Invalid Credentials!!")
        location.reload();

      });
  };
  const doSignOut = () => {
    signOut(auth).then(() => {
      setLoggedIn(false)
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage)
    });
    location.reload();
  }

  const addTask = async (taskDesc, caller, techstack, priority, employee, duedate, project) => {
    console.log(taskDesc, caller, techstack, priority, employee, duedate, project);
    try {
      let date = new Date().toJSON().slice(0, 10);
      const docRef = await addDoc(collection(db, "tasks"), {

        taskDesc: taskDesc,
        caller: caller,
        techstack: techstack,
        startdate: date,
        priority: priority,
        employee: employee,
        duedate: duedate,
        project: project,
        status: "Pending"
      });
      // console.log("Document written with ID: ", docRef.id);
      getAllTasks()
      // location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }




  const deletedoc = async (id) => {
    await deleteDoc(doc(db, `tasks/${id}`));
    // console.log("delete tasks");
    getAllTasks()
    // location.reload();
  }
  const deleteProject = async (id) => {
    await deleteDoc(doc(db, `Projects/${id}`));
    getAllProjects()
    // location.reload();
  }
  const addProject = async (projectName, projectDesc,lead, dueDate, priority, status) => {
    let date = new Date().toJSON().slice(0, 10);
    console.log(projectName, projectDesc,lead, dueDate, priority, status);
    try {
      const docRef = await addDoc(collection(db, "Projects"), {

        projectName: projectName,
        projectDesc: projectDesc,
        lead:lead,
        startDate: date,
        dueDate: dueDate,
        priority: priority,
        status: status
      });
      // console.log("Document written with ID: ", docRef.id);
      getAllProjects()
      // location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  // Provide both the authentication function and authentication state if needed
  const authContextValue = {
    doSignInWithEmailAndPassword,
    loggedIn,
    setLoggedIn,
    auth,
    doSignOut,
    addTask,
    doCreateUser,
    name,
    currentUser,
    deletedoc,
    taskCount,
    setTaskCount,
    addProject,
    setProjectCount,
    projectCount,
    setIsAdmin,
    isAdmin,
    allEmployee,
    allProjects,
    deleteProject,
    url,
    getAllProjects,
    allTasks,
    getAllTasks,
    // allEmployeeProfile,
    getAllEmployeeProfiles,
    geturl,
    userLoader,
    loginLoader

    // You can include other authentication-related functions or state here
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};


