import React from 'react'
import '../../assets/css/Home.css'
import Navbar from '../../common/Navbar'
import Pagination from '../../common/Pagination'
import EmpPopup from '../../common/EmpPopup'
import Sidebar from '../../common/Sidebar'
import { Link, useLocation } from 'react-router-dom';


function Employee() {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <>
      <div className='home-body'>
        <Navbar />
        <Sidebar role="admin" />
        <EmpPopup titles='Add Employee' />
        <Pagination />

      </div>
    </>
  )
}

export default Employee;