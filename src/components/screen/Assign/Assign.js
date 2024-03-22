import React from 'react'
import '../../assets/css/Home.css'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import AssignPagePopup from '../../common/AssignPagePopup'
import AssignPagination from '../../common/AssignPagination'


function Assign() {
  return (
    <>
    <div className='home-body'>

      <Navbar />
      <Sidebar />
      <AssignPagePopup title="Assign"/>
      <AssignPagination />
    </div>
    </>
  )
}

export default Assign;