import React from 'react'
import "../assets/css/ConfirmDelete.css"
import Button from './Button'


function ConfirmDelete(props) {





    return (
        <div className='cd-container'>
            <p className='cd-text'>Are you sure?</p>
            <div className='cd-buttons'>
                <div className='cd-left-button'>
                    <button className='yes-submit-button' onClick={()=>props.clickYes()}> Yes</button>
                </div>
                <div className='cd-right-button'>
                    <button className='no-submit-button' onClick={()=>props.clickNo()}> No</button></div>
            </div>
        </div>
        //   <Button type="button" Title="No" classfield={"no-submit-button"}  />
        //   <Button type="button" Title="Yes" classfield={"yes-submit-button" } onClick={props.click}/>
    )
}

export default ConfirmDelete