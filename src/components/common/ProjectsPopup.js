import React, { useState } from 'react';
import './../assets/css/Popup.css';
import Addproject from './AddProjects';
import StatusPopup from './../common/StatusPopup';


const Popup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setisSaved] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };


  return (
    <div>
      <button className="popup-openBtn" onClick={openModal}>Add Projects</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <Addproject function={()=>{setIsModalOpen(false)}} 
            close={()=>{setisSaved(true)}}/>
          </div>
        </div>
      )}
      {isSaved && (<StatusPopup message={"successfully Project Added!"} timeout={3000} />)}
    </div>
  );
};
    

export default Popup;