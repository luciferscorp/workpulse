import React, { useState, useEffect } from 'react'
import '../assets/css/Navbar.css'
import { IoIosNotifications } from "react-icons/io";
import { IconContext } from 'react-icons';
import profile_image from '../assets/images/blank-profile-picture-30x30.webp'

const Navbar = (props) => {

    const [roleName, setRoleName] = useState("");
    const [empName, setEmpName] = useState("")

    const decipher = (salt) => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
      }
        const myDecipher =  decipher('mySecretSalt')
      
      function getItemFromLocal(localData) {
        let form_data = JSON.parse(myDecipher(localStorage.getItem(localData)));
        return form_data;
        
      }

    const userData = getItemFromLocal("user_crypt") || { EmployeeName: "" };

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
