import React, { useState } from 'react'
import './card.css'

const Card = ({profileImg, postImg, name, profession, title, description, onDelete}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='card-container'>
     
          <img src={postImg} alt="post img"  onClick={() => setShowModal(true)}/>

     
        <div className="profile-img-name">
            <img src={profileImg} alt="profile pic" />
            <div className="name-prof">
                <h3>{name}</h3>
                <p>{profession}</p>
            </div>
        </div>
        <h3>{title}</h3>
        <p style={{fontWeight: '489'}}>{description}</p>
        <button onClick={onDelete} className='del-btn'>Delete</button>


         {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={postImg} alt="Large View" />
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card