import React, { useState, useEffect } from 'react'
//import { useNavigate } from "react-router-dom";
import '../assets/css/AssignPage.css';
import Input from './Input.js'
import Button from './Button.js'
import DropDown from './DropDown';
import { BaseUrl } from '../env/baseurl';
import TimePickerComponent from './TimePickerComponent';





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



function AssignTasks(props) {
  const [taskRecords, setTaskRecords] = useState([]);
  const [EmployeeRecords, setEmployeeRecords] = useState([]);
  const [employeeID, setemployeeID] = useState('');
  const [taskID, settaskID] = useState('');
  const [duration, setduration] = useState('');
  const [RawTime, setRawTime] = useState([]);
  const [error, setError] = useState('');

  // const [employeeIDs, setemployeeIDs] = useState([]);
  // const [employee, setemployee] = useState([]);
  // const [taskIDs, settaskIDs] = useState([]);
  // const [taskNames, setdescription] = useState();

  let local_data = getItemFromLocal("user_crypt")
  const projectleaderData = {
    EmployeeID: local_data.EmployeeID
  }

 
  

      let employeeIDs = EmployeeRecords.map((items) => (items.EmployeeID))
      const employee = EmployeeRecords.map((items) => (items.EmployeeName))
    
      let taskIDs = taskRecords.map((items) => (items.TaskID))
      let taskNames = taskRecords.map((items) => (items.TaskName))
 


  useEffect(() => {
    async function fetchTaskData() {
      try {
        const response = await fetch(BaseUrl + "api/gettasks", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(projectleaderData)
        });

        const { data } = await response.json();
        setTaskRecords(data || [])

      }
      catch (error) { console.error("error", error); }
    }

    async function fetchEmployeeData() {
      try {
        const response = await fetch(BaseUrl + "api/getallemployee", {
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
        setEmployeeRecords(data)

      }
      catch (error) { console.error("error", error); }
    }

    fetchTaskData()
    fetchEmployeeData()

  }, []);



  const AssignValidation = (e) => {
    e.preventDefault();
    if (taskID === "") {
      setError("Selct a task")
    } else if (employeeID == "") {
      setError("Selct Employee")
    } else if (duration == "") {
      setError("Assign duration")
    } else {

      setError("")

      const assignData = {
        AssignedToEmployeeID: employeeIDs[employeeID],
        TaskID: taskIDs[taskID],
        Duration: duration,
       
      }

      console.log("Assigned", assignData)


      async function fetchAssignTask() {
        try {
          const response = await fetch(BaseUrl + "api/assigntasks", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(assignData)
          });

          console.log( await response.json());

        }
        catch (error) { console.error("error", error); }
      }

      fetchAssignTask()

      props.function()
      props.close()

    }
  }




  return (
    <div>
      <div class="regcontainer">
        <form name="registrationForm" method="get">
          <div>
            <h3 className='reg-title'>Assign</h3>
            <buttom className='CompPopup-close-button' onClick={() => props.function()}>&times;</buttom>
          </div>
          <div>
            <DropDown id="dropdown" classfield="assign-task-dropdown" Title="Select Task"
              values={taskNames}
              onChange={(e) => { settaskID(e.target.value) }} />
          </div>
          <div>
            <DropDown id="dropdown" classfield="assign-employee-dropdown" Title="Select Employee"
              values={employee}
              onChange={(e) => { setemployeeID(e.target.value) }} />
          </div>
          <div>
            <TimePickerComponent handlechange={(e) => setduration(e.toString().split(" ")[4])} />
          </div>
          <span className='spanEnd' id='error'>{error}</span>
          <div className='AddCompany-Button'>
            <Button type="button" Title="Submit" classfield={"greenSubmitButton"} onClick={AssignValidation} />
          </div>
        </form>
      </div >
    </div >
  )
}



export default AssignTasks;
