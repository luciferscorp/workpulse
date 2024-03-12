import React from 'react'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import LoginPage from '../Login/Login'



function Home() {

  function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
  }

  const userData=getItemFromLocal("user_local");

  const { 
    Role,
    EmployeeName
  } = userData;

  return (
    <>
      <div className='home-body'>

        <Navbar />
        <Sidebar />
      

      </div>
    </>
  )
}

export default Home