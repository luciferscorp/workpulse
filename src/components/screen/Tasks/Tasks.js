import React from 'react'
import Navbar from '../../common/Navbar'
import TaskPagination from '../../common/TaskPagination'
import Sidebar from '../../common/Sidebar'
import TaskPagePopup from '../../common/TaskPagePopup'


function Tasks() {
  return (
    <>
    <div className='home-body'>

      <Navbar />
      <Sidebar />
      <TaskPagePopup title="Task"/>
      <TaskPagination />

    </div>
    </>
  )
}
  
export default Tasks;