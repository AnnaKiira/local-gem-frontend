import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlaceForm() {
  const [nameOfPlace, setNameOfPlace] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlace = { nameOfPlace, location, description };

    fetch('/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlace),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/places'); // Redirect to places list after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name of Place:</label>
        <input
          type="text"
          value={nameOfPlace}
          onChange={(e) => setNameOfPlace(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Add Place</button>
    </form>
  );
}

export default PlaceForm;
