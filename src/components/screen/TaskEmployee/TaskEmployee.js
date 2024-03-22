import React from 'react'
import '../../assets/css/Home.css'
import EmployeeTaskPagination from '../../common/EmployeeTaskPagination'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'



function TaskEmployee() {
  return (
    <>
    <div className='home-body'>

      <Navbar />
      <Sidebar />
      <EmployeeTaskPagination />
    </div>
    </>
  )
}

export default TaskEmployee;