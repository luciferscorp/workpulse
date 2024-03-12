import React, { useState, useEffect } from 'react'
import '../assets/css/AddCompany.css'
import { BaseUrl } from '../env/baseurl';
import Button from './Button.js'
import DropDown from './DropDown';


function ViewCompany(props) {
  const [allprojectleaders, setallprojectleaders] = useState([]);
  const [allprojects, setallprojects] = useState([])
  const [ProjectID, setProjectID] = useState("");
  const [ProjectLeader, setProjectLeader] = useState("");
  const [error, setError] = useState('');

  // console.log("A", typeof ProjectID, "B", ProjectLeader)


  let projectleaders = allprojectleaders.map((items) => (items.EmployeeName))
  let projectleadersIDs = allprojectleaders.map((items) => (items.EmployeeID))

  let projects = allprojects.map((items) => (items.ProjectName))
  let projectsIDs = allprojects.map((items) => (items.ProjectID))

  useEffect(() => {
    async function fetchEmployeeData() {
      try {

        const response = await fetch(BaseUrl + "api/getavailableprojects", {
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
        setallprojects(data)

      }
      catch (error) { console.error("error", error); }
    }

    async function fetchProjectData() {
      try {
        const response = await fetch(BaseUrl + "api/getavailableprojectleaders", {
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
        setallprojectleaders(data)

      }
      catch (error) { console.error("error", error); }
    }
    fetchEmployeeData()
    fetchProjectData()
  }, []);



  const projectManagerValidation = (e) => {
    e.preventDefault();

    if (ProjectID === "") {
      setError("Select your Project");
    } else if (ProjectLeader === "") {
      setError("Select your Project Leader");
    } else {
      setError("")
      let assignProjectLeaders = {
        ProjectID: projectsIDs[ProjectID],
        ProjectLeader: projectleadersIDs[ProjectLeader]
      }
      console.log("Obj", assignProjectLeaders);


      let url = BaseUrl + "api/assignleader"
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assignProjectLeaders),
      }).then(response => response.json())
        .then(data => console.log(data))


      props.function()
      props.close()
    }
  }




  return (
    <div>
      <div class="regcontainer">
        <form name="registrationForm" method="get">
          <div>
            <h3 className='reg-title'> Company Details</h3>
            <buttom className='AssignLeadPopup-close-button' onClick={() => props.function()}>&times;</buttom>
          </div>
          <div>
            <DropDown id="dropdown" Title="Select Project" classfield="assignlead-dropdown"
              values={projects}
              onChange={(e) => setProjectID(e.target.value)} />
          </div>
          <div>
            <DropDown id="dropdown" Title="Select Project Leader" classfield="assignlead-dropdown"
              values={projectleaders }
              onChange={(e) => setProjectLeader(e.target.value)} />
          </div>
          <span className='spanEnd' id='error'>{error}</span>
          <div className='AddCompany-Button'>
            <Button type="button" Title="Submit" classfield={"greenSubmitButton"} onClick={projectManagerValidation} />
          </div>
        </form>
      </div >
    </div >
  )
}


export default ViewCompany;


// import React, { useState, useEffect } from 'react'
// import '../assets/css/AddCompany.css'
// import { BaseUrl } from '../env/baseurl';
// import Button from './Button.js'
// import DropDown from './DropDown';


// function AssignLeader(props) {
//   const [allprojectleaders, setallprojectleaders] = useState([]);
//   const [allprojects, setallprojects] = useState([])
//   const [ProjectID, setProjectID] = useState();
//   const [ProjectLeader, setProjectLeader] = useState();
//   // console.log("A", typeof ProjectID, "B", ProjectLeader)

//   let projectleaders = allprojectleaders.map((items) => (items.EmployeeName))
//   let projectleadersIDs = allprojectleaders.map((items) => (items.EmployeeID))

//   let projects = allprojects.map((items) => (items.ProjectName))
//   let projectsIDs = allprojects.map((items) => (items.ProjectID))

//   useEffect(() => {
//     async function fetchEmployeeData() {
//       try {

//         const response = await fetch(BaseUrl + "api/getavailableprojects", {
//           method: "GET",
//           mode: "cors",
//           cache: "no-cache",
//           credentials: "same-origin",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           redirect: "follow",
//           referrerPolicy: "no-referrer",
//         });

//         const { data } = await response.json();
//         setallprojects(data)

//       }
//       catch (error) { console.error("error", error); }
//     }

//     async function fetchProjectData() {
//       try {
//         const response = await fetch(BaseUrl + "api/getavailableprojectleaders", {
//           method: "GET",
//           mode: "cors",
//           cache: "no-cache",
//           credentials: "same-origin",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           redirect: "follow",
//           referrerPolicy: "no-referrer",
//         });

//         const { data } = await response.json();
//         setallprojectleaders(data)

//       }
//       catch (error) { console.error("error", error); }
//     }
//     fetchEmployeeData()
//     fetchProjectData()
//   }, []);



//   let assignProjectLeaders = {
//     ProjectID: projectsIDs[ProjectID],
//     ProjectLeader: projectleadersIDs[ProjectLeader]
//   }

//   console.log("Obj", assignProjectLeaders);

//   return (
//     <div>
//       <div class="regcontainer">
//         <form name="registrationForm" method="get">
//           <div>
//             <h3 className='reg-title'> Assign Project Leader</h3>
//             <buttom className='AssignLeadPopup-close-button' onClick={() => props.function()}>&times;</buttom>
//           </div>
//           <div>
//             <DropDown id="dropdown" Title="Select Project" classfield="assignlead-dropdown"
//               values={projects}
//               onChange={(e) => setProjectID(e.target.value)} />
//           </div>
//           <div>
//             <DropDown id="dropdown" Title="Select Project Leader" classfield="assignlead-dropdown"
//               values={projectleaders}
//               onChange={(e) => setProjectLeader(e.target.value)} />
//           </div>
//           <span className='spanEnd' id='error'></span>
//           <div className='AddCompany-Button'>
//             <Button type="button" Title="Submit" classfield={"greenSubmitButton"} />
//           </div>
//         </form>
//       </div >
//     </div >
//   )
// }


// export default AssignLeader;
