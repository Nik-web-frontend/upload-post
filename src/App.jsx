import React, { useEffect, useState } from 'react'
import data from './component/data.json'
import Card from './component/Card'
import axios from 'axios'

const App = () => {
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("cards");
    return stored ? JSON.parse(stored) : data;
  })
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    postImg: '',
    profileImg: '',
    name: '',
    profession: '',
    title: '',
    description: ''
  });
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleForm = (e) => {
    e.preventDefault();
    const newCard = {
      ...formData,
      id: Date.now()
    };
    setCards([...cards, newCard]);
    setFormData({
      postImg: '',
      profileImg: '',
      name: '',
      profession: '',
      title: '',
      description: ''
    })
    setShowForm(false)

  }
  const handleDelete = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };


  return (

    <div className='app-main'>
      {!showForm && (
        <div className="add-card" onClick={() => { setShowForm(true) }}>
          <button className='add-btn'> <i className="fas fa-plus"></i></button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleForm}>
          <h3>Add Card Form</h3>

          <input
            placeholder='Upload Post Image'
            style={{
              height: '3rem'
            }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, postImg: reader.result });
              };
              if (file) reader.readAsDataURL(file);
            }}
            required
          />

          <input
            placeholder='Upload Profile Image'
            style={{
              height: '3rem'
            }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, profileImg: reader.result });
              };
              if (file) reader.readAsDataURL(file);
            }}
            required
          />
          <input type="text" placeholder='Enter Name' onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} required />
          <input type="text" placeholder='Enter Profession' onChange={(e) => { setFormData({ ...formData, profession: e.target.value }) }} required />
          <input type="text" placeholder='Enter Title' onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} required />
          <textarea placeholder='Enter Description' onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} required />
          <button className='submit-btn'>Submit</button>
          <button onClick={() => { setShowForm(false) }} className='submit-btn'>Cancel</button>
        </form>
      )}


      {
        cards.map((i, idx) => {
          return <Card key={i.id || idx} {...i} onDelete={() => handleDelete(i.id)} />
        })
      }

    </div>
  )
}

export default App