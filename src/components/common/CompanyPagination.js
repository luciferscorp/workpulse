import React, { useState, useEffect } from 'react';
import '../assets/css/CompanyPagination.css';
import { BaseUrl } from '../env/baseurl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ConfirmDelete from './ConfirmDelete';

const CompanyPagination = () => {

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
            const response = await fetch(BaseUrl+"getallcompanies", {
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
            //     const respond = await response.json().then(result => {
            //     setdata(result.data)
            //     setrecords(result.data.slice(firstIndex, lastIndex))
            //     settotalPage(Math.ceil(result.data.length / recordPerPage))
            // // Assuming totalPage is a positive integer
            //     setnumbers(Array.from({ length: totalPage }, (_, index) => index + 1));
            // });


        }
        catch (error) { console.error("error", error); }
    }

    useEffect(() => {
        fetchData();
        setnumbers(Array.from({ length: totalPage }, (_, index) => index + 1));
    }, [currentPage, totalPage]);



    //api put function 
    async function updateEmpFunction(cmpid) {
        try {
            const updateUserData = { isactivate: activeIsActive, CompanyID: cmpid }
            const response = await fetch( BaseUrl+ "updateCompanyUsers", {
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
            console.log("data", data);



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
            const response = await fetch(BaseUrl + 'deletecomapanyrecord', {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deleteData),
            });

            const data = await response.json();
            console.log("data", data);

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
        deleterecord(tobeDeleted)
        setisActive(false)
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <>
            <div className="cmp-bodycontainer">
                <div className='cmp-tablecontainer'>
                    <table className="cmp-tablecontent">
                        <thead>
                            <th className='cmp-tablehead'>Company Name</th>
                            <th className='cmp-tablehead'>Created By</th>
                            <th className='cmp-tablehead'>Created On</th>
                            <th className='cmp-tablehead'>Active</th>
                            <th className='cmp-tablehead'>Action</th>
                        </thead>
                        <tbody className='cmp-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='cmp-tablerow' key={i}>
                                    <td className='cmp-tabledata'>{ArrayData.CompanyName}</td>
                                    <td className='cmp-tabledata'>{ArrayData.CreatedBy}</td>
                                    <td className='cmp-tabledata'>{ArrayData.CreatedOn}</td>
                                    <td className='cmp-tabledata'>

                                        {ArrayData.CompanyID === activeEmployeeId && activeIsActive !== hide ? "" : ArrayData.isActive === 1 ? <p className='company-activeStatus'>Active</p> : <p className='company-disableStatus'>Disable</p>}

                                        {hide && ArrayData.CompanyID === activeEmployeeId && (

                                            <select id="activeStatus" name="status" active="select" onChange={(e) => { setActiveIsActive(e.target.value) }}>
                                                <option value=""></option>
                                                <option className='company-status-Active' value="1">Active</option>
                                                <option className='company-status-Disable' value="0">Disable</option>
                                            </select>

                                        )}
                                    </td>
                                    <td className='cmp-tabledata'>
                                        {!hideEdit.has(ArrayData.CompanyID) && ArrayData.CompanyID !== activeEmployeeId &&
                                            (<EditIcon
                                                onClick={() => {
                                                    updateEmpFunction(ArrayData.CompanyID);
                                                    setActiveEmployeeId(ArrayData.CompanyID);
                                                    setActiveIsActive(ArrayData.isActive);
                                                    setHide(!hide);
                                                    setHideEdit(hideEdit.add(ArrayData.CompanyID));
                                                    setcounter(counter + 1);

                                                }} />)}

                                        {hide && ArrayData.CompanyID === activeEmployeeId &&
                                            (<DoneIcon
                                                onClick={() => {
                                                    updateEmpFunction(ArrayData.CompanyID);
                                                    setActiveEmployeeId(ArrayData.CompanyID);
                                                    setActiveIsActive(ArrayData.isActive);
                                                    setcounter(counter + 1);

                                                }} />)}

                                    {/* <DeleteIcon onClick={() => (deleterecord(ArrayData.CompanyID))} /> */}
                                        <DeleteIcon onClick={() => {
                                           // deleteProjectRecord(ArrayData.ProjectID)
                                           handleclick();
                                           settobeDeleted(ArrayData.CompanyID)
                                       }} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isActive && <ConfirmDelete clickNo={()=> handleclick_no()} clickYes={()=>handleclick_yes()}/>}
                <nav className='cmp-navbar'>
                    <ul className='cmp-pagination'>
                        <li className='cmp-page-item'>
                            <a href='#' className='cmp-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`cmp-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='cmp-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='cmp-page-item'>
                            <a href='#' className='cmp-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )



}

export default CompanyPagination;