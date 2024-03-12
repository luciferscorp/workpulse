import React, { useState, useEffect } from 'react';
import '../assets/css/Pagination.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Button from "./Button.js";
import Input from "./Input.js";
import { BaseUrl } from '../env/baseurl';
import ConfirmDelete from './ConfirmDelete';

const Pagination = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [data, setdata] = useState([]);
    const [records, setrecords] = useState([]);
    const [totalPage, settotalPage] = useState();
    const [numbers, setnumbers] = useState([]);
    const recordPerPage = 5;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const [activeEmployeeId, setActiveEmployeeId] = useState(null);
    const [activeIsActive, setActiveIsActive] = useState(null);
    const [hide, setHide] = useState(false);
    const [hideEdit, setHideEdit] = useState(new Set());
    /// set() consist of add , delete, has 
    const [counter, setcounter] = useState(0);
    const [isActive, setisActive] = useState(false);
    const [tobeDeleted, settobeDeleted] = useState("");

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
            const response = await fetch(BaseUrl + "getallusers", {
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
    async function updateEmpFunction(empid) {
        try {
            const updateUserData = { isactivate: activeIsActive, EmployeeID: empid }
            const response = await fetch(BaseUrl + "updateEmployeeUsers", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(updateUserData),
            })
            const data = await response.json();
            // console.log("data", data);

            if (counter > 0) {
                refreshPage()
            }
        }
        catch (error) { console.error("Error---", error); }
    }

    //api delete function 
    async function deleterecord(id) {
        try {
            const deleteData = { id: id };
            const response = await fetch(BaseUrl + 'deleterecord', {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deleteData),
            });

            const data = await response.json();
            // console.log("data", data);
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

    function handleclick_no() {
        setisActive(false)
    }

    function handleclick_yes() {
        deleterecord(tobeDeleted)
        setisActive(false)
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <>
            <div className="emp-bodycontainer">
                <div className='emp-tablecontainer'>
                    <table className="emp-tablecontent">
                        <thead>
                            <th className='emp-tablehead'>Employee Name</th>
                            <th className='emp-tablehead'>Email</th>
                            <th className='emp-tablehead'>RoleName</th>
                            <th className='emp-tablehead'>Active</th>
                            <th className='emp-tablehead'>JoiningDate</th>
                            <th className='emp-tablehead'>Action</th>
                        </thead>
                        <tbody className='emp-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='emp-tablerow' key={i}>
                                    <td className='emp-tabledata'>{ArrayData.EmployeeName}</td>
                                    <td className='emp-tabledata'>{ArrayData.Email}</td>
                                    <td className='emp-tabledata'>{ArrayData.rolename}</td>
                                    <td className='emp-tabledata'>

                                        {ArrayData.EmployeeID === activeEmployeeId && activeIsActive !== hide ? "" : ArrayData.isActive === 1 ? <p className='employee-activeStatus'>Active</p> : <p className='employee-disableStatus'>Disable</p>}

                                        {hide && ArrayData.EmployeeID === activeEmployeeId && (

                                            <select id="activeStatus" name="status" active="select" onChange={(e) => { setActiveIsActive(e.target.value) }}>
                                                <option value=""></option>
                                                <option className='employee-status-Active' value="1">Active</option>
                                                <option className='employee-status-disable' value="0">Disable</option>
                                            </select>

                                        )}


                                    </td>
                                    <td className='emp-tabledata'>{ArrayData.JoiningDate}</td>
                                    <td className='emp-tabledata'>

                                        {!hideEdit.has(ArrayData.EmployeeID) && ArrayData.EmployeeID !== activeEmployeeId &&
                                            (<EditIcon
                                                onClick={() => {
                                                    updateEmpFunction(ArrayData.EmployeeID);
                                                    setActiveEmployeeId(ArrayData.EmployeeID);
                                                    setActiveIsActive(ArrayData.isActive);
                                                    setHide(!hide);
                                                    setHideEdit(hideEdit.add(ArrayData.EmployeeID));
                                                    setcounter(counter + 1);

                                                }} />)}

                                        {hide && ArrayData.EmployeeID === activeEmployeeId &&
                                            (<DoneIcon
                                                onClick={() => {
                                                    updateEmpFunction(ArrayData.EmployeeID);
                                                    setActiveEmployeeId(ArrayData.EmployeeID);
                                                    setActiveIsActive(ArrayData.isActive);
                                                    setcounter(counter + 1);

                                                }} />)}

                                        {/* <DeleteIcon onClick={() => (deleterecord(ArrayData.EmployeeID))} /> */}
                                        <DeleteIcon onClick={() => {
                                            // deleteProjectRecord(ArrayData.ProjectID)
                                            handleclick();
                                            settobeDeleted(ArrayData.EmployeeID)
                                        }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isActive && <ConfirmDelete clickNo={() => handleclick_no()} clickYes={() => handleclick_yes()} />}
                <nav className='emp-navbar'>
                    <ul className='emp-pagination'>
                        <li className='emp-page-item'>
                            <a href='#' className='emp-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`emp-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='emp-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>))
                        }
                        <li className='emp-page-item'>
                            <a href='#' className='emp-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination;