import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService.js';

const PlaceForm = ({ handleAddPlace, handleUpdatePlace }) => {
  const [formData, setFormData] = useState({
    placeName: '',
    location: '',
    image: '',
    description: '',
  });

  // Location variables
  const { placeId } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      const singlePlace = await placeService.show(placeId);
      setFormData(singlePlace);
    };
    if (placeId) {
      fetchPlace();
    }
  }, [placeId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (placeId) {
      handleUpdatePlace(placeId, formData);
    } else {
      handleAddPlace(formData);
    }
  };

  return (
    <main>
      <h1>{ placeId ? 'Update Place' : 'Create Place'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="placeName-input">Name of Place</label>
        <input
          required
          type="text"
          name="placeName"
          id="placeName-input"
          value={formData.placeName}
          onChange={handleChange}
        />
        <label htmlFor="location-input">Location</label>
        <input
          required
          type="text"
          name="location"
          id="location-input"
          value={formData.location}
          onChange={handleChange}
        />
        <label htmlFor="image-input">Image URL</label>
        <input
          required
          type="text"
          name="image"
          id="image-input"
          value={formData.image}
          onChange={handleChange}
        />
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default PlaceForm;
