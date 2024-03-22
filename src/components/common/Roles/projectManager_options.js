import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IoLogIn } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";



export const projectManager_options = [
  {
    title: 'Projects',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'navtext'
  },
  {
    title: 'Project Manager',
    path: '#',
    icon: <IoIcons.IoIosPaper />,
    cName: 'navtext'
  },
  {
    title: 'Logout',
    path: '#',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navtext'
  },
];