import React, { useState, useEffect } from 'react';
import '../assets/css/AssignPagination.css';
import { BaseUrl } from '../env/baseurl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Button from "./Button.js";
import Input from "./Input.js";

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

const AssignPagination = () => {

    let local_data = getItemFromLocal("user_crypt")
    const projectleaderData = {
        EmployeeID: local_data.EmployeeID
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setdata] = useState([]);
    const [records, setrecords] = useState([]);
    const [totalPage, settotalPage] = useState();
    const [numbers, setnumbers] = useState([]);
    const [Companies, setCompanies] = useState();
    const recordPerPage = 5;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const [activeProjectId, setactiveProjectId] = useState(null);
    const [activeProjectName, setactiveProjectName] = useState("");
    const [activeProjectDescription, setactiveProjectDescription] = useState("");
    const [hide, setHide] = useState(false);
    const [hideEdit, setHideEdit] = useState(new Set());
    /// set() consist of add , delete, has 
    const [counter, setcounter] = useState(0);
    const [status, setstatus] = useState('');

    // console.log("records",Companies);



    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changePage(newdt) {
        setCurrentPage(newdt);
    }
    function nextPage() {
        if (currentPage !== totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    //api get function 
    async function fetchData() {
        try {
            const response = await fetch(BaseUrl + "api/getassignedtasks", {
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

            const { data, status } = await response.json();
            // const { status } = await response.json();

            setdata(data)
            setrecords(data.slice(firstIndex, lastIndex))
            settotalPage(Math.ceil(data.length / recordPerPage))


        }
        catch (error) { console.error("error", error); }
    }

    useEffect(() => {
        fetchData();
        setnumbers(Array.from({ length: totalPage }, (_, index) => index + 1));
    }, [currentPage, totalPage]);

    //api put function 
    async function updateTaskFunction(TaskUpdateParam) {
        try {
            const TaskProjectData =
            {
                TaskDescription: activeProjectDescription,
                ProjectID: TaskUpdateParam
            }
            const response = await fetch(BaseUrl + "TaskProjectData", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(TaskProjectData),
            })
            const data = await response.json();
            // const status = await response.json();
            // console.log("after then click ", activeProjectDescription);

            if (counter > 0) {
                refreshPage()
            }
        }
        catch (error) { console.error("Error", error); }
    }
    function refreshPage() {
        window.location.reload();
    }
    return (
        <>
            <div className="assign-prj-bodycontainer">
                <div className='assign-prj-tablecontainer'><h4 className='AssignPagination-heading' >Assign Details</h4>
                    <table className="assign-prj-tablecontent">
                        <thead>
                            <th className='assign-prj-tablehead'>Project Name</th>
                            <th className='assign-prj-tablehead'>Task Name</th>
                            <th className='assign-prj-tablehead '>Description</th>
                            <th className='assign-prj-tablehead'>Duration</th>
                            <th className='assign-prj-tablehead'>Employee Name</th>
                        </thead>
                        <tbody className='assign-prj-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='assign-prj-tablerow' key={i}>

                                    {/* project name  */}
                                    <td className='assign-prj-tabledata'>{ArrayData.ProjectName}</td>

                                    {/* Task name  */}
                                    <td className='assign-prj-tabledata'>{ArrayData.TaskName}</td>

                                    {/* project description */}
                                    <td className=' assign-prj-description'>
                                        {ArrayData.ProjectID === activeProjectId && hide ? "" : ArrayData.TaskDescription}

                                        {hide && ArrayData.ProjectID === activeProjectId && (

                                            <input
                                                defaultValue={ArrayData.TaskDescription}
                                                onChange={(e) => {
                                                    setactiveProjectDescription(e.target.value);
                                                    // console.log("value",e.target.value);
                                                }} />
                                        )}
                                    </td>
                                    <td className='assign-prj-tabledata'>{ArrayData.Duration }</td>
                                    <td className='assign-prj-tabledata'>{ArrayData.EmployeeName}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className='assign-prj-navbar'>
                    <ul className='assign-prj-pagination'>
                        <li className='assign-prj-page-item'>
                            <a href='#' className='assign-prj-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`assign-prj-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='assign-prj-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='assign-prj-page-item'>
                            <a href='#' className='assign-prj-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )



}

export default AssignPagination;