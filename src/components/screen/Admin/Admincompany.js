import React from 'react'

import '../../assets/css/Home.css'
import RegisterPage from '../Register/Register'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import Pagination from '../../common/Pagination'
import Popup from '../../common/Popup'


function Admin() {
  return (
    <>
    <div className='home-body'>

      <Navbar />
      <Sidebar role="admin"/>
      <Popup/>
      <Pagination />
      
    </div>
    </>
  )
}

export default Admin;