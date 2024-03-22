import React, { useState, useEffect } from 'react';
import '../assets/css/TaskPagination.css';
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

const TaskPagination = () => {

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
    const [taskProjectLead, settaskProjectLead] = useState([])

    let taskcurrentDateRaw = new Date()
    let taskupdateDate = taskcurrentDateRaw.toISOString().split('T')[0].split("-").reverse().join("/");

    // console.log("taskdata",data);

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
            const response = await fetch(BaseUrl + "api/getleaderstasks", {
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
            setdata(data);
            setrecords(data.slice(firstIndex, lastIndex));
            settotalPage(Math.ceil(data.length / recordPerPage));
            settaskProjectLead(data.map((items) => (items.ProjectLeader)));
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
                EmployeeID: projectleaderData.EmployeeID,
                UpdatedOn : taskupdateDate,
                TaskID: TaskUpdateParam,
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
            <div className="task-prj-bodycontainer">
                <div className='task-prj-tablecontainer'><h4 className='TaskPagination-heading' >Task Details</h4>
                    <table className="task-prj-tablecontent">
                        <thead>
                            <th className='task-prj-tablehead'>Project Name</th>
                            <th className='task-prj-tablehead'>Task Name</th>
                            <th className='task-prj-tablehead '>Description</th>
                            <th className='task-prj-tablehead'>Action</th>
                        </thead>
                        <tbody className='task-prj-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='task-prj-tablerow' key={i}>

                                    {/* project name  */}
                                    <td className='task-prj-tabledata'>{ArrayData.ProjectName}</td>

                                    {/* Task name  */}
                                    <td className='task-prj-tabledata'>{ArrayData.TaskName}</td>

                                    {/* project description */}
                                    <td className=' task-prj-description'>
                                        {ArrayData.TaskID === activeProjectId && hide ? "" : ArrayData.TaskDescription}

                                        {hide && ArrayData.TaskID === activeProjectId && (
                                            <input
                                                defaultValue={ArrayData.TaskDescription}
                                                onChange={(e) => {
                                                    setactiveProjectDescription(e.target.value);
                                                }} />


                                        )}</td>

                                    {/* action field  */}
                                    <td className='cmp-tabledata'>
                                        {!hideEdit.has(ArrayData.TaskID) && ArrayData.TaskID !== activeProjectId &&
                                            (<EditIcon sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    updateTaskFunction(ArrayData.TaskID);
                                                    setactiveProjectId(ArrayData.TaskID);
                                                    setactiveProjectDescription(ArrayData.TaskDescription);
                                                    setHide(!hide);
                                                    setHideEdit(hideEdit.add(ArrayData.TaskTaskID));
                                                    setcounter(counter + 1);
                                                    // console.log("edit taskid",ArrayData.TaskID);
                                                    // console.log("after click ", ArrayData.Description);
                                                    // console.log("Input value",inputRef.current.value);

                                                }} />)}

                                        {hide && ArrayData.TaskID === activeProjectId &&
                                            (<DoneIcon sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    updateTaskFunction(ArrayData.TaskID);
                                                    setactiveProjectId(ArrayData.TaskID);
                                                    setactiveProjectDescription(ArrayData.TaskDescription);
                                                    setcounter(counter + 1);
                                                    // console.log("done taskid",ArrayData.TaskID);
                                                }} />)}

                                        {/* <DeleteIcon onClick={() => (deleteProjectRecord(ArrayData.TaskID))} /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className='task-prj-navbar'>
                    <ul className='task-prj-pagination'>
                        <li className='task-prj-page-item'>
                            <a href='#' className='task-prj-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`task-prj-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='task-prj-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='task-prj-page-item'>
                            <a href='#' className='task-prj-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )



}

export default TaskPagination;