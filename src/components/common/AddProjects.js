import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../assets/css/AddProjects.css'

import Input from './Input.js'
import Button from './Button.js'
import { BaseUrl } from '../env/baseurl';
import DropDown from './DropDown';


function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
}

function Addproject(props) {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [companyRecords, setcompanyRecords] = useState([]);
    const [companyID, setCompanyID] = useState('');
    const [error, setError] = useState('');

    let companies = companyRecords.map((items) => (items.CompanyName))
    let companyIDs = companyRecords.map((items) => (items.CompanyID))

    console.log(companyRecords);

    //To fetch Company Details from database

    let url = BaseUrl + "getallcompanies";
    useEffect(() => {
        async function fetchCompanyData() {
            try {
                const response = await fetch(url, {
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
                setcompanyRecords(data)

            }
            catch (error) { console.error("error", error); }
        }

        fetchCompanyData()
    }, []);






    let currentDateRaw = new Date()
    let currentDdate = currentDateRaw.toISOString().split('T')[0].split("-").reverse().join("/");

    const convertDateString = (dateString) => {
        return dateString.split("-").reverse().join("/")
    }

    const ProjectValidation = (e) => {
        e.preventDefault();

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (projectName === "") {
            setError("Enter your project name");
        } else if (!isNaN(projectName)) {
            setError("Project name should not be with numbers");
        } else if (projectDescription === "") {
            setError("Write Project's Description");
        } else if (startDate == "") {
            setError("Pick a start date");
        } else if (endDate == "") {
            setError("Pick a end date");
        } else if (companyID == "") {
            setError("Select Company");
        } else {
            setError("");

            const userData = getItemFromLocal("user_local") || { EmployeeID: null };

            const {
                EmployeeID
            } = userData;

            const projectData = {
                ProjectName: projectName,
                Description: projectDescription,
                StartDate: startDate,
                EndDate: endDate,
                CreatedOn: currentDdate,
                CompanyID: companyIDs[companyID],
                CreatedBy: EmployeeID
            }

            console.log("Projectdata:", projectData);
            console.log("Date is =", currentDdate)


            async function fetchData() {
                try {
                    let url2 = BaseUrl + "api/addprojects"
                    const response = await fetch(url2, {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(projectData)
                    })
                    const result = await response.json()
                        .then(data => {
                            console.log(data);
                        })
                } catch (err) {
                    console.error("API Error: ", err);
                }
            }
            fetchData()


            props.function()
            props.close()
        }
    }

    return (

        <div class="project-container">

            <div>
                <h3 className='project-reg-title'>Add project</h3>
                <buttom className='project-popup-close-button' onClick={() => props.function()}>&times;</buttom>
            </div>

            <Input type="text" id="project_name" placeholder="Project Name" classfield="project-inputField" onChange={(e) => setProjectName(e.target.value)} />
            <textarea rows="6" placeholder="Describe the project here..." form="usrform" className='project-description'
                onChange={(e) => setProjectDescription(e.target.value)}>
            </textarea>
            <div className='divison'>

                <Input type="date" placeholder="Start Date" classfield="startdate-inputField" onChange={(e) => setStartDate(convertDateString(e.target.value))} />
                <Input type="date" placeholder="End Date" classfield="enddate-inputField" onChange={(e) => setEndDate(convertDateString(e.target.value))} />

            </div>

            <div>
                <DropDown id="dropdown" classfield="project-companies-dropdown" Title="Select Company"
                    values={companies}
                    onChange={(e) => setCompanyID(e.target.value)} />

            </div>

            <span className='spanEnd' id='error'>{error}</span>

            <div>
                <Button type="button" Title="Add project" classfield={"blue-submit-button"} onClick={ProjectValidation} />
            </div>

        </div >

    )
}

export default Addproject;
