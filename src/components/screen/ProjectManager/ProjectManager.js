import React from 'react'
import '../../assets/css/Home.css'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import PmanagerPopup from "../../common/PmanagerPopup.js";
import ProjectManagerPagination from '../../common/ProjectManagerPagination';


function ProjectManager() {
  
  
    
      return (
        <>
          <div className='home-body'>
    
            <Navbar />
            <Sidebar role="projectmanager"/>
            <PmanagerPopup titles="View"/>
            <ProjectManagerPagination />
    
          </div>
        </>
      )
}

export default ProjectManager;