import React from 'react'
import { useState } from 'react'
import '../assets/css/input.css'

const Input = (props) => {
  // const [placeholder1, setplaceholder1] = useState(2);
  // const [type1, settype1] = useState("");


  return (
    <div className='divison'>
      <input type={props.type} placeholder={props.placeholder} value={props.value} 
      className={props.classfield} onChange={(e)=>props.onChange(e)}  />
    </div>
  )
}

export default Input;









