import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import FinishedTasks from './pages/FinishedTasks.jsx';
import Tasks from './pages/Tasks.jsx';
import Profile from './pages/Profile.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import { AuthContextProvider } from './context/firebase-context.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
// import { authContextProvider } from './context/firebase-context.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/projects",
        element:<Projects/>
      },
      {
        path:"/tasks",
        element:<Tasks/>
      },
      {
        path:"/finishedtasks",
        element:<FinishedTasks/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/taskdetails",
        element:<TaskDetails/>
      },
      {
        path:"/projectdetails",
        element:<ProjectDetails/>
      },
      
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  {/* <React.StrictMode> */}
 
  <AuthContextProvider>


    <RouterProvider router={router} />
   
  </AuthContextProvider>

   {/* </React.StrictMode> */}
  </>
)
