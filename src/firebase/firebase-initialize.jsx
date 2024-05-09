import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyC0njJDuPUkvSD21QbtYXBx-Buj1-vRhdU",
    authDomain: "xlab-ee9ce.firebaseapp.com",
    projectId: "xlab-ee9ce",
    storageBucket: "xlab-ee9ce.appspot.com",
    messagingSenderId: "39194323423",
    appId: "1:39194323423:web:08b728a67c68199cc37c6a",
    measurementId: "G-16MPGHFC6H"
  };
// const firebaseConfig = {
//   apiKey: "AIzaSyAawhgx2uZWaWEpYIiEzPfjhC9xDJhN-Tk",
//   authDomain: "xlab-7441d.firebaseapp.com",
//   projectId: "xlab-7441d",
//   storageBucket: "xlab-7441d.appspot.com",
//   messagingSenderId: "100047883244",
//   appId: "1:100047883244:web:757a73b37fe4279c540ec9"
// };
  // Initialize Firebase outside of the component
  // const firebaseConfig = { /* Your Firebase config */ };
 export const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
export const storage = getStorage();

export const tasks = collection(db, "tasks");

// export const [tasksArr, setTasksArr] = useState([])
// getDocs(tasks).then( (snapshot)=>{
//   console.log(snapshot.docs);
//   snapshot.docs.forEach((doc)=>{
//     console.log(doc.data());
//   setTasksArr([...tasksArr , doc.data()])
// })
// })
