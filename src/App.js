import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/screen/Home/Home.js'
import RegisterPage from './components/screen/Register/Register.js'
import LoginPage from "./components/screen/Login/Login.js";

import Admin from "./components/screen/Admin/Admin.js";
import Assign from "./components/screen/Assign/Assign.js";
import Employee from "./components/screen/Employee/Employee.js";
import Company from "./components/screen/Company/Company.js";
import ProjectManager from "./components/screen/ProjectManager/ProjectManager.js";
import Projects from "./components/screen/Projects/Projects.js";
import Tasks from "./components/screen/Tasks/Tasks.js";
import Test from "./components/screen/Test/Test.js";
import Logout from "./components/common/Logout.js";
import TaskEmployee from "./components/screen/TaskEmployee/TaskEmployee.js";



function App() {

  const [counter, setcounter] = useState(0);

  const decipher = (salt) => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
  }
  function getItemFromLocal(localData) {
    const encryptedData = localStorage.getItem(localData);
    if (encryptedData) {
      const decryptedData = decipher('mySecretSalt')(encryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  }
 let userData = getItemFromLocal("user_crypt");
//  console.log("Degrypted",userData);
 
  // function getItemFromLocal(localData) {
  //   let form_data = JSON.parse(localStorage.getItem(localData));
  //   return form_data;
  // }

  // function Error404() {
  //   return <h2>Access Unauthorized</h2>;
  // }

  // const userData = getItemFromLocal("user_local");
  // console.log("From local ", userData)

  //404 error  handling code
  function refreshPage() {
    if (counter === 1) {
        // First time reload
        window.location.reload();
        // reloadCount++;
    } else if (counter === 2) {
        // Second time reload
        alert(' Unauthorized access');
        return(
        <>
       <div>
       <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
     </div></>
        )}
    }
    
  function Error404() {
    return refreshPage(setcounter(counter+1));
  }

  // console.log("From local ", userData)
  const openrouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Error404 />
      
    },

  ]);
  const router1 = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <LoginPage />,
      

    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
    {
      path: "/company",
      element: <Company />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: '*',
      element: <Error404 />
      
    },
  ]);
  const router2 = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <LoginPage />,
      
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/projectmanager",
      element: <ProjectManager />,
    },

    {
      path: "/projects",
      element: <Projects />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: '*',
      element: <Error404 />
      
    },
  ]);
  const router3 = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <LoginPage />,
      
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/assign",
      element: <Assign />,
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: '*',
      element: <Error404 />
      
    },
  ]);
  const router4 = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <LoginPage />,
      
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/employeetasks",
      element: <TaskEmployee />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: '*',
      element: <Error404 />
      
    },
  ]);
  return (
    <RouterProvider router={userData === null ? openrouter : 
      (userData.Role === 1 ? router1 : 
        (userData.Role === 2 ? router2 : 
          (userData.Role === 3 ? router3 : router4)))} />
  );
}

export default App;
