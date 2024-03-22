import React from 'react'
import '../../assets/css/RegisterPage.css'
import Sidebar from '../../common/Sidebar';
import Input from '../../common/Input.js'
import Button from '../../common/Button.js'
import DropDown from '../../common/DropDown';


function RegisterPage(props) {

  
  return (
    <div>
      <div class="regcontainer">
        <form name="registrationForm" method="get">
          <div>
            <h3 className='reg-title'>Sign Up</h3>
            <buttom className='CompPopup-close-button' onClick={()=>props.function()}>&times;</buttom>
          </div>
          <div>
            <Input type="text" id="username" placeholder="Employee Name" classfield="inputField"/>
          </div>
          <div>
            <Input type="email" id="email" placeholder="Email" classfield="inputField"/>
          </div>
          <div>
            <Input type="password" id="password" placeholder="Password" classfield="inputField"/>
          </div>
          <div>
            <Input type="password" id="re-password" placeholder="Confirm Password" classfield="inputField" />
          </div>
          <div>
            <DropDown id="dropdown" Title="Select Role" classfield="reg-dropdown" values={['Project Manager', 'Project Leader', 'Employee']} />
          </div>
          <div>
            <Input type="date" id="join_date" placeholder="Joining Date" classfield="dateField" />
          </div>
          <span class="span"></span>
          <div>
            <Button type="button" Title="Submit" />
          </div>
        </form>
      </div >
    </div >
  )
}

export default RegisterPage;
