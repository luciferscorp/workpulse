import React, { useState, useEffect } from 'react';
import '../assets/css/TaskPagination.css';
import { BaseUrl } from '../env/baseurl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Button from "./Button.js";
import Input from "./Input.js";



const TaskPagination = () => {


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
            const response = await fetch(BaseUrl+ "getallTasks", {
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



    return (
        <>
            <div className="prj-bodycontainer">
                <div className='prj-tablecontainer'>
                    <table className="prj-tablecontent">
                        <thead>
                            <th className='prj-tablehead'>Project Name</th>
                            <th className='prj-tablehead '>Description</th>
                            <th className='prj-tablehead'>Action</th>
                        </thead>
                        <tbody className='prj-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='prj-tablerow' key={i}>

                                    {/* project name  */}
                                    <td className='prj-tabledata'>
                                        {ArrayData.ProjectID === activeProjectId && hide ? "" : ArrayData.ProjectName}
                                        {hide && ArrayData.ProjectID === activeProjectId && (
                                            <input
                                                onChange={(e) => { setactiveProjectName(e.target.value) }} />
                                        )}</td>

                                    {/* project description */}
                                    <td className=' prj-description'>
                                        {ArrayData.ProjectID === activeProjectId && hide ? "" : ArrayData.TaskDescription}
                                        {hide && ArrayData.ProjectID === activeProjectId && (
                                            <input
                                                onChange={(e) => { setactiveProjectDescription(e.target.value) }} />
                                        )}</td>
                                    {/* <td className='prj-tabledata'>{ArrayData.CompanyID}</td> */}
                                    {/* <td className='prj-tabledata'>{ArrayData.StartDate}</td>
                                    <td className='prj-tabledata'>{ArrayData.EndDate}</td> */}

                                    {/* action field  */}
                                    <td className='cmp-tabledata'>
                                        {!hideEdit.has(ArrayData.ProjectID) && ArrayData.ProjectID !== activeProjectId &&
                                            (<EditIcon sx={{cursor:"pointer"}}
                                                onClick={() => {
                                                    
                                                    setactiveProjectId(ArrayData.ProjectID);
                                                    setactiveProjectName(ArrayData.ProjectName);
                                                    setactiveProjectDescription(ArrayData.Description);
                                                    setHide(!hide);
                                                    setHideEdit(hideEdit.add(ArrayData.ProjectID));
                                                    setcounter(counter + 1);

                                                }} />)}

                                        {hide && ArrayData.ProjectID === activeProjectId &&
                                            (<DoneIcon sx={{cursor:"pointer"}}
                                                onClick={() => {
                                                
                                                    setactiveProjectId(ArrayData.ProjectID);
                                                    setactiveProjectName(ArrayData.isActive);
                                                    setcounter(counter + 1);
                                                }} />)}

                                        {/* <DeleteIcon onClick={() => (deleteProjectRecord(ArrayData.ProjectID))} /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className='prj-navbar'>
                    <ul className='prj-pagination'>
                        <li className='prj-page-item'>
                            <a href='#' className='prj-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`prj-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='prj-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='prj-page-item'>
                            <a href='#' className='prj-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )



}

export default TaskPagination;