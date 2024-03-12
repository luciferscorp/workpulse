import React, { useState, useEffect } from 'react'
import '../assets/css/AddEmployee.css'

import Input from './Input.js'
import Button from './Button.js'
import DropDown from './DropDown';
import { BaseUrl } from '../env/baseurl';

function AddEmployee(props) {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [re_Password, setRe_Password] = useState('');
  const [role, setRole] = useState()
  const [date, setDate] = useState('')
  const [error, setError] = useState('');
  const [EmailVerify, setEmailVerify ] = useState([]);


  const convertString = (dateString) => {
    return dateString.split("-").reverse().join("/")
  }

  const EmployeeValidation = (e) => {
    e.preventDefault();

    //Encryption of the password
    const cipher = salt => {
      const textToChars = text => text.split('').map(c => c.charCodeAt(0));
      const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
      return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
    }
    const mycipher = cipher('mySecretSalt')

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userName === "") {
      setError("Enter your username");
    } else if (!isNaN(userName)) {
      setError("Name should not be with numbers");
    } else if (email === "") {
      setError("Enter your email address");
    } else if (!email.match(mailformat)) {
      setError("Please enter the valid email");
    } else if (EmailVerify.includes(email)) {
      setError("Already exist email");
    } else if (password === "") {
      setError("Enter you password");
    }  else if (re_Password === "") {
      setError("Re-enter you password");
    } else if (password != re_Password) {
      setError("Password does't match");
    } else if (role == "") {
      setError("Select a role");
    } else if (date == "") {
      setError("Pick a date");
    } else {
      setError("");
      // console.log("Hello user", userName)


      const userData = {
        EmployeeName: userName,
        Email: email,
        Password: mycipher(password),
        Role: role,
        JoiningDate: date,
        CreatedOn: date,
        CreatedBy: "Admin"
      }

      console.log("Userdata", userData);
      console.log("Date is =", date)


      let url = BaseUrl + "api/addemployee"
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      }).then(response => response.json())
        .then(data => console.log(data))

        
      props.function()
      props.close()

    }
  }



      //api get function 
      async function GetEmployeeData() {
        try {
            const response = await fetch(BaseUrl+"getallusers", {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const { data } = await response.json();
            const emaildata = data.map((value) => (value.Email)) ;
            setEmailVerify(emaildata);
            
           
        }
        catch (error) { console.error("error", error); }
    }
    useEffect(() => {

      GetEmployeeData()

    }, [])

  return (

    <div class="empolyee-regcontainer">

      <div>
        <h3 className='empolyee-reg-title'>Add Employee</h3>
        <buttom className='popup-close-button' onClick={() => props.function()}>&times;</buttom>
      </div>

      <div className='divison'>

        <Input type="text" id="userName" placeholder="Employee Name" classfield="employee-inputField" onChange={(e) => setUserName(e.target.value)} />

        <Input type="email" id="email" placeholder="Email" classfield="email-inputField" onChange={(e) => setEmail(e.target.value)} />

        <Input type="password" id="password" placeholder="Password" classfield="pass-inputField" onChange={(e) => setPassword(e.target.value)} />

        <Input type="password" id="re_Password" placeholder="Confirm Password" classfield="cnf-pass-inputField" onChange={(e) => setRe_Password(e.target.value)} />

      </div>

      <div>
        <DropDown id="dropdown" Title="Select Role" classfield="register-dropdown" 
        values={['Project Manager', 'Project Leader', 'Employee']} 
        onChange={(e) => setRole(2+ +e.target.value)} />
      </div>
      <div>
        <Input type="date" id="join_date" placeholder="Joining Date" classfield="registerdateField" onChange={(e) => setDate(convertString(e.target.value))} />
      </div>
      <span className='spanEnd' id='error'>{error}</span>
      <div>
        <Button type="button" Title="Add Employee" onClick={EmployeeValidation} classfield={"blue-submit-button"} />
      </div>

    </div >

  )
}

export default AddEmployee;