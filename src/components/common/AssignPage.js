import React, { useState } from 'react'
//import { useNavigate } from "react-router-dom";
import '../assets/css/AssignPage.css';
import Input from './Input.js'
import Button from './Button.js'




// function getItemFromLocal(localData) {
//   let form_data = JSON.parse(localStorage.getItem(localData));
//   return form_data;
// }



function AssignPage(props) {

//   const navigate = useNavigate();

//   const [companyName, setCompanyName] = useState('')
//   const [error, setError] = useState('');

//   let currentDateRaw = new Date()
//   let currentDdate = currentDateRaw.toISOString().split('T')[0].split("-").reverse().join("/");


//   const CompanyValidation = (e) => {
//     e.preventDefault();
//     if (companyName === "") {
//       setError("Enter your Company  Name");
//     } else if (!isNaN(companyName)) {
//       setError("Company name should not be with numbers");
//     } else {
//       setError("");

//       // const userData = getItemFromLocal("user_local") || { EmployeeID: null };

//       // const {
//       //   EmployeeID
//       // } = userData;

//       const companyData = {
//         CompanyName: companyName,
//         CreatedOn: currentDdate,
//         CreatedBy: "Admin"
//       }

//       async function fetchData() {
//         try {
//           let url = BaseUrl + "api/addcompany"
//           const response = await fetch(url, {
//             method: "POST",
//             mode: "cors",
//             cache: "no-cache",
//             credentials: "same-origin",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             redirect: "follow",
//             referrerPolicy: "no-referrer",
//             body: JSON.stringify(companyData)
//           });
//           const result = await response.json().then(data => {
//             console.log(data)
//           });
//         }
//         catch (error) {
//           console.error("Error", error);
//         }
//       }
//       fetchData()

      
//       props.function()
//       props.close()
//     }
//   }

  return (
    <div>
      <div class="regcontainer">
        <form name="registrationForm" method="get">
          <div>
            <h3 className='reg-title'>Assign</h3>
            <buttom className='EmpPopup-close-button' onClick={() => props.function()}>&times;</buttom>
          </div>
          <div>
            <Input type="text" id="companyName" placeholder="Assign Task" classfield="inputField" /*onChange={(e) => setCompanyName(e.target.value)}*/ />
          </div>
          <div>
            <Input type="text" id="companyName" placeholder="Assign Task" classfield="inputField" /*onChange={(e) => setCompanyName(e.target.value)}*/ />
          </div>
          <span className='spanEnd' id='error'></span>
          <div className='AddCompany-Button'>
            <Button type="button" Title="Submit" classfield={"greenSubmitButton"} />
          </div>
        </form>
      </div >
    </div >
  )
}



export default AssignPage;
