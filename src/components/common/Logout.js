import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../assets/css/logout.css"

function Logout() {
  const navigate = useNavigate()
  localStorage.removeItem("user_local")


  useEffect(()=>{
    navigate("/login")
  },[])


  return (
    <div>
      <span className='logout-text'>Logging Out</span>
    </div>
  )
}

export default Logout;