import React, { useState } from 'react';
import './../assets/css/Popup.css';
import AddEmployee from "./AddEmployee.js";
import StatusPopup from './../common/StatusPopup';

const Popup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setisSaved] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <button className="popup-openBtn" onClick={openModal}>{props.titles}</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <AddEmployee function={() => { setIsModalOpen(false) }}
              close={() => { setisSaved(true) }} />
          </div>
        </div>
      )}
      {isSaved && (<StatusPopup message={"successfully Added!"} timeout={2000} />)}
    </div>
  );
};


export default Popup;