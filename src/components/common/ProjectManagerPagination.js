import React, { useState, useEffect } from 'react';
import '../assets/css/ProjectsPagination.css';
import { BaseUrl } from '../env/baseurl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Button from "./Button.js";
import Input from "./Input.js";



const ProjectManagerPagination = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [data, setdata] = useState([]);
    const [records, setrecords] = useState([]);
    const [totalPage, settotalPage] = useState();
    const [numbers, setnumbers] = useState([]);

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

    console.log("records", records);



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
            let url = BaseUrl + "api/getallprojects"
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
    async function updateProjectFunction(projectUpdateParam) {
        try {
            const updateProjectData =
            {
                ProjectName: activeProjectName,
                Description: activeProjectDescription,
                ProjectID: projectUpdateParam
            }
            const response = await fetch(BaseUrl + "updateProjectData", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(updateProjectData),
            })
            const data = await response.json();// console.log("data", data);
            if (counter > 0) {
                refreshPage()
            }
        }
        catch (error) { console.error("Error", error); }
    }

    //api delete function 
    async function deleteProjectRecord(projectDeleteParam) {
        try {
            const deleteProjectData = { id: projectDeleteParam };
            const response = await fetch(BaseUrl + 'deleteProjectData', {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deleteProjectData),
            });
            const data = await response.json();// console.log("data", data);
            console.log("Delete", projectDeleteParam);
            if (counter >= 0) {
                refreshPage()
            }
        } catch (error) {
            console.error("error", error);
        }
    }



    function refreshPage() { window.location.reload(); }

    return (
        <>
            <div className="prj-bodycontainer">
                <div className='prj-tablecontainer'>
                    <table className="prj-tablecontent">
                        <thead>
                            <th className='prj-tablehead'>Project Name</th>

                            <th className='prj-tablehead'>Company Name</th>
                            <th className='prj-tablehead'>Project Leader</th>

                        </thead>
                        <tbody className='prj-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='prj-tablerow' key={i}>

                                    {/* project name  */}
                                    <td className='prj-tabledata'>
                                        {ArrayData.ProjectName}
                                    </td>

                                    <td className='prj-tabledata'>{ArrayData.CompanyName}</td>
                                    <td className='prj-tabledata'>{ArrayData.ProjectLeader == null ? "Not Assigned" : ArrayData.EmployeeName}</td>

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

export default ProjectManagerPagination;