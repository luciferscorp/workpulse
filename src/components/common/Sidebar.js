import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/Sidebar.css'
import { IconContext } from 'react-icons';

//Sidebar Data
import { SidebarData } from './SidebarData';


function Sidebar(props) {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar || false);
  const location = useLocation();
  
  const [data, setData] = useState([]);


  function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
  }

  const userData = getItemFromLocal("user_local") || {Role: 4};

  const {
    Role
  } = userData;

  let role = Role;

  useEffect(() => {

    //  setRole({"name":"projectManager"})
    if (role === 1) {
      setData(SidebarData.admin_options)
    }
    else if (role === 2) {
      setData(SidebarData.projectManager_options)

    }
    else if (role === 3) {
      setData(SidebarData.projectLeader_options)

    }
    else if (role === 4) {
      setData(SidebarData.employee_options)

    }

    // console.log("role",{"rr":"projectManager"});

    // setTimeout(() => {
    //    console.log("role",role);

    // }, 2000);


  }, [role])
  

  return (
    <>
      <div className='sidebar-body'>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='sidebar'>
            <Link to='#' className='menubaropen'>
              <FaIcons.FaBars onClick={() => showSidebar()} />
            </Link>
          </div>
          <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
            <ul className='navmenuitems'>
              <li className='navbartoggle' onClick={() => showSidebar()}>
                <Link to='#' className='menubarclose'>
                  <FaIcons.FaBars />
                </Link>
              </li>

              {data.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} className={item.path == location.pathname ? "nav-text-active" : ""} >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

          </nav>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default Sidebar;