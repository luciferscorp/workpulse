import React, { useState, useEffect } from 'react';
import '../assets/css/ProjectsPagination.css';
import { BaseUrl } from '../env/baseurl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Button from "./Button.js";
import Input from "./Input.js";
import ConfirmDelete from './ConfirmDelete';



const ProjectPagination = () => {


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
    const [isActive, setisActive] = useState(false);
    const [tobeDeleted, settobeDeleted] = useState("");


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


    function handleclick() {
        setisActive(true)
    }

    function handleclick_no(){
        setisActive(false)
    }

    function handleclick_yes(){
        deleteProjectRecord(tobeDeleted)
        setisActive(false)
    }

    function refreshPage() { window.location.reload(); }

    return (
        <>
            <div className="prj-bodycontainer">
                <div className='prj-tablecontainer'>
                    <table className="prj-tablecontent">
                        <thead>
                            <th className='prj-tablehead'>Project Name</th>
                            <th className='prj-tablehead '>Description</th>
                            <th className='prj-tablehead'>StartDate</th>
                            <th className='prj-tablehead'>End Date</th>
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
                                        {ArrayData.ProjectID === activeProjectId && hide ? "" : ArrayData.Description}
                                        {hide && ArrayData.ProjectID === activeProjectId && (
                                            <input
                                                onChange={(e) => { setactiveProjectDescription(e.target.value) }} />
                                        )}</td>
                                    <td className='prj-tabledata'>{ArrayData.StartDate}</td>
                                    <td className='prj-tabledata'>{ArrayData.EndDate}</td>

                                    {/* action field  */}
                                    <td className='cmp-tabledata'>
                                        {!hideEdit.has(ArrayData.ProjectID) && ArrayData.ProjectID !== activeProjectId &&
                                            (<EditIcon
                                                onClick={() => {
                                                    updateProjectFunction(ArrayData.ProjectID);
                                                    setactiveProjectId(ArrayData.ProjectID);
                                                    setactiveProjectName(ArrayData.ProjectName);
                                                    setactiveProjectDescription(ArrayData.Description);
                                                    setHide(!hide);
                                                    setHideEdit(hideEdit.add(ArrayData.ProjectID));
                                                    setcounter(counter + 1);

                                                }} />)}

                                        {hide && ArrayData.ProjectID === activeProjectId &&
                                            (<DoneIcon
                                                onClick={() => {
                                                    updateProjectFunction(ArrayData.ProjectID);
                                                    setactiveProjectId(ArrayData.ProjectID);
                                                    setactiveProjectName(ArrayData.isActive);
                                                    setcounter(counter + 1);
                                                }} />)}

                                        <DeleteIcon onClick={() => {
                                           
                                            // deleteProjectRecord(ArrayData.ProjectID)
                                            handleclick();
                                            settobeDeleted(ArrayData.ProjectID)
                                        }} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isActive && <ConfirmDelete clickNo={()=> handleclick_no()} clickYes={()=>handleclick_yes()}/>}
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

export default ProjectPagination;