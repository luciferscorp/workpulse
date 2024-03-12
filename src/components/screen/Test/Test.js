import { dblClick } from '@testing-library/user-event/dist/click';
import { App } from 'antd'
import ErrorList from 'antd/es/form/ErrorList';
import React from 'react'
import Addproject from '../../common/AddProjects';




function Test() {

  function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
  }

  const userData = getItemFromLocal("usdfer_local");
  console.log("From local ",userData)

  
  
  return (
    <div>
     
    </div>

  );

}


export default Test