import React, { useState,useEffect } from 'react'
//import { useNavigate } from "react-router-dom";
import '../assets/css/TaskPage.css';
import { BaseUrl } from '../env/baseurl';
import Button from './Button.js'
import DropDown from './DropDown';




// function getItemFromLocal(localData) {
//   let form_data = JSON.parse(localStorage.getItem(localData));
//   return form_data;
// }



function TaskPage(props) {

//   const navigate = useNavigate();

  const [taskDescription, setTaskDescription] = useState("")
  const [projectRecords, setProjectRecords] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [error, setError] = useState('');



  //fetch all project details from dp
  let projects = projectRecords.map((items) => (items.ProjectName))
  let projectIDs = projectRecords.map((items) => (items.ProjectID))

  console.log(projectRecords);

  //To fetch Projects Details from database
  useEffect(() => {
      async function fetchProjectData() {
          try {
              const response = await fetch(BaseUrl+ "getallprojects", {
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
              setProjectRecords(data)

          }
          catch (error) { console.error("error", error); }
      }

      fetchProjectData()
  }, []);
  

  console.log("taskDescription",taskDescription);
// 
  const TaskPageValidation = (e) => {
    e.preventDefault();
    
    if (projectID === "") {
      setError("Select Project Name");
  } else if (taskDescription === "") {
      setError("Write task in Description");
  } else {
      setError("");

const TaskData = {  TaskDescription:taskDescription,  ProjectID: projectIDs[projectID]  }
      

      async function fetchData() {
        try {

        
          const response = await fetch(BaseUrl+ "addTask", {
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
          console.log("result",result);
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
            <textarea rows="6" placeholder="Describe the task here..." form="usrform" className='TaskDescription' onChange={(e) => setTaskDescription(e.target.value)}>
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



export default TaskPage;
