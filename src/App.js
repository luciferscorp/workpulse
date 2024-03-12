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


function App() {
  function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
  }

  function Error404() {
    return <h2>Access Unauthorized</h2>;
  }

  const userData = getItemFromLocal("user_local");
  console.log("From local ", userData)

  const openrouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
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
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/logout",
      element: <Logout />,
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
