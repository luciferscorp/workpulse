import React from 'react'
import '../assets/css/button.css'

export default function Button({Title,Type,onClick,classfield,btnplaceholder}) {
  return (
    <div>
      <button className={classfield} type={Type}  onClick={(e)=>onClick(e)} placeholder={btnplaceholder}>{Title}</button>
    </div>
  )
}
