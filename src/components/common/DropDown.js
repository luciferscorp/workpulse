import React from 'react'
import { useState } from 'react'

import '../assets/css/DropDown.css'

const Option = ({ values }) => {
  return (
    <option >{values}</option>
  )
}

const DropDown = ({ id, Title, values, classfield, onChange }) => {

  return (
    <div >
      <select className={classfield} id={id} onChange={(e) => onChange(e)} >
        <option class="top-option" disabled selected>
          <div className='dropdown-title'>{Title}</div>
        </option>
        {
          values.map((element, i) => <option className='option-list' value={i} >{element}</option>)
        }
      </select>
    </div>
  )

  // <DropDown id="values" Tile="Select Role" values=['Project Manager','Project Leader','Team Member']  />
}

export default DropDown;









