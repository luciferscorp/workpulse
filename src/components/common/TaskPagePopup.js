
import React, { useState } from 'react';
import '../assets/css/CompPopup.css'
import StatusPopup from './../common/StatusPopup';
import AddTasks from './AddTasks';

const TaskPagePopup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setisSaved] = useState(false)


  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="popup-container">
      <button className="CompPopup-openBtn" onClick={openModal}>{props.title}</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
           
            <AddTasks function={()=>{setIsModalOpen(false)}} 
            close={()=>{setisSaved(true)}}/>
           
          </div>
        </div>
      )}
    {isSaved && (<StatusPopup message={"Successfully Added!"} timeout={3000} />)}
    </div>
  );
};

export default TaskPagePopup;