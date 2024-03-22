import React from 'react'
import '../../assets/css/Home.css'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import ProjectsPopup from '../../common/ProjectsPopup'
import ProjectPagination from '../../common/ProjectsPagination'


function Projects() {
  return (
    <>
      <div className='home-body'>

        <Navbar />
        <Sidebar />
        <ProjectsPopup  />
        <ProjectPagination />

      </div>
    </>
  )
}

export default Projects;