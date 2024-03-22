import React, { useState, useEffect } from 'react'
//import { useNavigate } from "react-router-dom";
import '../assets/css/TaskPage.css';
import { BaseUrl } from '../env/baseurl';
import Button from './Button.js'
import DropDown from './DropDown';
import Input from './Input';




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



function AddTasks(props) {

  //   const navigate = useNavigate();

  const [taskDescription, setTaskDescription] = useState("")
  const [projectRecords, setProjectRecords] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [error, setError] = useState('');
  const [TaskName, setTaskName] = useState('');

  let currentDateRaw = new Date()
  let currentDate = currentDateRaw.toISOString().split('T')[0].split("-").reverse().join("/");

  //fetch all project details from dp
  let projects = projectRecords.map((items) => (items.ProjectName))
  let projectIDs = projectRecords.map((items) => (items.ProjectID))

  console.log(projectRecords);

  let local_data = getItemFromLocal("user_crypt")
  const projectleaderData = {
    EmployeeID: local_data.EmployeeID
  }
  //API to Get the paticular ProjectLeader's ID
  useEffect(() => {



    async function fetchProjectData() {
      try {
        const response = await fetch(BaseUrl + "api/getleadersprojects", {
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
        setProjectRecords(data)

      }
      catch (error) { console.error("error", error); }
    }

    fetchProjectData()
  }, []);


  console.log("taskDescription", taskDescription);
  // 
  const TaskPageValidation = (e) => {
    e.preventDefault();

    if (projectID === "") {
      setError("Select Project Name");
    } else if (TaskName === "") {
      setError("Enter Task Name");
    } else if (taskDescription === "") {
      setError("Write task in Description");
    } else {
      setError("");

      const TaskData = {
        ProjectID: projectIDs[projectID],
        TaskName: TaskName,
        TaskDescription: taskDescription,
        CreatedBy: local_data.EmployeeID,
        CreatedOn: currentDate
      }

      console.log("Task",TaskData );

      async function fetchData() {
        try {
          const response = await fetch(BaseUrl + "addTask", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(TaskData)
          });
          const result = await response.json()
          console.log("result", result);
        }
        catch (error) {
          console.error("Error", error);
        }
      }
      fetchData();

      props.function()
      props.close()


    }
  }

  // useEffect(() => {
  //     fetchData()
  //   }, [])

  //      } props.function()
  //       props.close()
  //     }
  //   }

  return (
    <div>
      <div class="regcontainer">
        <form name="registrationForm" method="get">
          <div>
            <h3 className='reg-title'>Task</h3>
            <buttom className='Task-close-button' onClick={() => props.function()}>&times;</buttom>
          </div>
          <div>
            <DropDown id="dropdown" classfield="Task-dropdown" Title="Project Name"
              values={projects}
              onChange={(e) => setProjectID(e.target.value)} />
          </div>
          <div>
            <Input type="text" placeholder="Task Name" maxLength='30' classfield="taskname-inputField" onChange={(e) => setTaskName(e.target.value)} />
          </div>
          <textarea rows="6" placeholder="Describe the task here..." maxLength={150} form="usrform" className='TaskDescription' onChange={(e) => setTaskDescription(e.target.value)}>
          </textarea>
          <span className='spanEnd' id='error'>{error}</span>
          <div className='AddCompany-Button'>
            <Button type="button" Title="Submit" classfield={"greenSubmitButton"} onClick={TaskPageValidation} />
          </div>
        </form>
      </div >
    </div >
  )
}



export default AddTasks;
