import React, { useState, useEffect } from 'react'
import Navbar from '../../common/Navbar'
import TaskPagination from '../../common/TaskPagination'
import Sidebar from '../../common/Sidebar'
import TaskPagePopup from '../../common/TaskPagePopup'
import { BaseUrl } from '../../env/baseurl'

//Decryption code  for the getItem
const decipher = (salt) => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}
  const myDecipher =  decipher('mySecretSalt')

function getItemFromLocal(localData) {
  let form_data = JSON.parse(myDecipher(localStorage.getItem(localData)));
  return form_data;
  
}

function Tasks() {
  const [ProjectRecords, setProjectRecords] = useState()
  const [isActive, setisActive] = useState(true);

  useEffect(() => {

    let local_data = getItemFromLocal("user_crypt")
    const projectleaderData = {
      EmployeeID: local_data.EmployeeID
    }

    async function fetchProjectData() {
      try {
        const response = await fetch(BaseUrl + "api/getleadersprojects", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(projectleaderData)
        });

        const { data } = await response.json();
        setProjectRecords(data)

      }
      catch (error) { console.error("error", error); }
    }

    fetchProjectData()

    if (ProjectRecords === undefined) {
      setisActive(true)
    } else {
      setisActive(false)
    }

  }, []);



  return (
    <>
      <div className='home-body'>

        <Navbar />
        <Sidebar />
        {ProjectRecords != undefined ?
          <>
            <TaskPagePopup title="Task" />
            <TaskPagination />
          </> : <></>}


      </div>
    </>
  )
}

export default Tasks;