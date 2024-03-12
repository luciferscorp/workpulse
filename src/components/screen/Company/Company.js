import React from 'react'
import CompanyPagination from '../../common/CompanyPagination'
import CompPopup from '../../common/CompPopup'
import Navbar from '../../common/Navbar'
import Pagination from '../../common/Pagination'
import Sidebar from '../../common/Sidebar'




function Company() {
  
  return (
    <>
      <div className='home-body'>

        <Navbar />
        <Sidebar role="admin" />
        <CompPopup title="Add Company" />
        <CompanyPagination />
      </div>
    </>
  )
}

export default Company;