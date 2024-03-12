import React, { useState, useEffect } from 'react'
import '../assets/css/Navbar.css'
import { IoIosNotifications } from "react-icons/io";
import { IconContext } from 'react-icons';
import profile_image from '../assets/images/blank-profile-picture-30x30.webp'

const Navbar = (props) => {

    const [roleName, setRoleName] = useState("");
    const [empName, setEmpName] = useState("")

    function getItemFromLocal(localData) {
        let form_data = JSON.parse(localStorage.getItem(localData));
        return form_data;
    }

    const userData = getItemFromLocal("user_local") || { EmployeeName: "" };

    const {
        EmployeeName, Role
    } = userData;

    useEffect(() => {
        
        setEmpName(EmployeeName)

        if (Role === 1) {
            setRoleName("Admin");
        } else if (Role === 2) {
            setRoleName("Project Manager");
        } else if (Role === 3) {
            setRoleName("Project Leader");
        } else if (Role === 4) {
            setRoleName("Employee");
        } else {
            //navigate('/');
        }

    }, []);

    return (
        <div className='navbar'>
            <IconContext.Provider value={{ color: '#fff' }}>
                <ul className='navbar-items'>
                    <li className='notif-icon'>
                        <IoIosNotifications />
                    </li>
                    <li className="emp-name">{empName} ({roleName})</li>
                    <li className='profile'>

                        <img src={profile_image} alt='profile' />

                    </li>
                </ul>
            </IconContext.Provider>
        </div>
    )
}

export default Navbar
