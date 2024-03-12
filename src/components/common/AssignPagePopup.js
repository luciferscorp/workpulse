
import React, { useState } from 'react';
import '../assets/css/EmpPopup.css'
//import StatusPopup from './../common/StatusPopup';
import AssignPage from './AssignPage';

const AssignPagePopup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [isSaved, setisSaved] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="popup-container">
      <button className="EmpPopup-openBtn" onClick={openModal}>{props.title}</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
           
            <AssignPage function={()=>{setIsModalOpen(false)}} 
            /*close={()=>{setisSaved(true)}}*//>
           
          </div>
        </div>
      )}
    {/* {isSaved && (<StatusPopup message={"Successfully Added!"} timeout={2000} />)} */}
    </div>
  );
};

export default AssignPagePopup;