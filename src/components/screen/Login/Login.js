import '../../assets/css/LoginPage.css'
import Sidebar from '../../common/Sidebar';
import Input from '../../common/Input.js'
import Button from '../../common/Button.js'
import { useState, useEffect } from 'react'
import { BaseUrl } from '../../env/baseurl';
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [email, setEmail] = useState("");
  // const [rawPassword, setRawPassword] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  //Password Encryption
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

  //LocalStorage function
  function storeInLocal(data_arr) {
    let myJSON = JSON.stringify(data_arr);

    localStorage.setItem("user_local", myJSON);
  }

  //Getting user input with props
  const getInput = (e) => {
    e.preventDefault()
    return e.target.value;
  }

  const loginValidation = (e) => {
    e.preventDefault()
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") {
      setError("Enter your email address");
    } else if (!email.match(mailformat)) {
      setError("Invalid Email");
    } else if (password === "") {
      setError("Enter your password");
    } else {
      setError("");

      //API Block: POST Request
      let userData = {
        Email: email,
        Password: password
      }

      //console.log(userData)
      let url = BaseUrl + "api/login"
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)

          if (data.status === 500) {
            alert("Internal Server Error");
          } else if (data.status === 300) {
            setError("Invalid credentials");
          } else if (data.status === 200) {
            if (data.data[0].isDelete !== 0) {
              setError("User was deleted");
            } else if(data.data[0].isActive !== 1){
              setError("User is inactive");
            } else {
              const { Role, EmployeeName, EmployeeID, Email, JoiningDate } = data.data[0];
              const userDataLocal = {
                Role: Role,
                EmployeeID: EmployeeID,
                EmployeeName: EmployeeName,
                Email: Email,
                JoiningDate: JoiningDate
              }

              //Role based redirection
              if (Role === 1) {
                navigate('/employee');
              } else if (Role === 2) {
                navigate('/projects');
              } else if (Role === 3) {
                navigate('/tasks');
              } else if (Role === 4) {
                navigate('/tasks');
              } else {
                navigate('/');
              }

              storeInLocal(userDataLocal)

            }
            // (data.data[0].isActive==1)? navigate('/admin'): setError("User is inactive");
          }
        })

    }
  }

  return (
    <>
      <div className='login-body'>
        <div className="container">
          <form>
            <div>
              <h3>Login </h3>
            </div>
            <div>
              <Input type="email" id="email" name="username" placeholder="Email" classfield="inputField" onChange={(e) => setEmail(getInput(e))} />
            </div>
            <div>
              <Input type="password" id="password" name="password" placeholder="Password" classfield="inputField" onChange={(e) => setPassword(mycipher(getInput(e)))} />
            </div>
            <div className="error">
              <span className="spanEnd" id="error">{error}</span>
            </div>
            <div>
              <Button type="button" Title="Submit" onClick={loginValidation} classfield={"submitButton"} />
            </div>
          </form>
        </div>
      </div>
    </>

  );
}

export default LoginPage;