import React from 'react';
import "./ModalBot.css";

export default function ModalBot({ modal, toggleModal, title }) {
  if (modal) {
    console.log("modal Open");

  } else {
    console.log("modal Closed");
  }
  return (
    <div>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'>
            <div className='modal-content'>
              <h2>{title}</h2>
              <p>
                Aliquip fugiat Lorem adipisicing laborum cupidatat nostrud labore.
                Incididunt deserunt culpa Lorem sunt qui ut quis nulla excepteur.
                Ex aliquip consequat pariatur nulla. Est eu sint amet Lorem. Sint
                Lorem do duis elit reprehenderit eiusmod voluptate qui occaecat minim.
                Excepteur Lorem duis sint velit culpa irure do aliquip laboris.
              </p>
              <button className='copy-btn'>COPY</button>
              <button className='close-btn' onClick={toggleModal}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
