import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoLogIn } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";


export const SidebarData = {
  admin_options:[
    {
      title: 'Employee',
      path: '/employee',
      icon: <IoIcons.IoMdPeople />,
      cName: 'navtext'
    },
    {
      title: 'Company',
      path: '/company',
      icon: <FaBuilding />,
      cName: 'navtext'
    },
    {
      title: 'Logout',
      path: '/logout',
      icon: <BiLogOut />,
      cName: 'navtext'
    },
  ],
  employee_options:
    [
      {
        title: 'Tasks',
        path: '/tasks',
        icon: <FaTasks />,
        cName: 'navtext'
      },
      {
        title: 'Logout',
        path: '/logout',
        icon: <BiLogOut />,
        cName: 'navtext'
      },
      
    ],
    projectLeader_options:[
      {
        title: 'Tasks',
        path: '/tasks',
        icon: <FaTasks />,
        cName: 'navtext'
      },
      {
        title: 'Assign',
        path: '/assign',
        icon: <IoIcons.IoIosPaper />,
        cName: 'navtext'
      },
      {
        title: 'Logout',
        path: '/logout',
        icon: <BiLogOut />,
        cName: 'navtext'
      },
     
    ],
    projectManager_options:[
      {
        title: 'Projects',
        path: '/projects',
        icon: <GoProjectRoadmap />,
        cName: 'navtext'
      },
      {
        title: 'Project Manager',
        path: '/projectmanager',
        icon: <GrUserManager />,
        cName: 'navtext'
      },
      {
        title: 'Logout',
        path: '/logout',
        icon: <BiLogOut />,
        cName: 'navtext'
      },
    ]



};