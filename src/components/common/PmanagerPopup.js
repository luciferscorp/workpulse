import React, { useState } from 'react';
import './../assets/css/Popup.css';
import AssignLeader from './AssignLeader';
import StatusPopup from './../common/StatusPopup';


const Popup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setisSaved] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="popup-openBtn" onClick={openModal}>{props.titles}</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <AssignLeader function={()=>setIsModalOpen(false)}
             close={() => { setisSaved(true) }}/>
            
          </div>
        </div>
      )}
        {isSaved && (<StatusPopup message={"Successfully Added!"} timeout={2000} />)}
    </div>
  );
};
    

export default Popup;