import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import * as placeService from '../../services/placeService.js'
import ImageUpload from '../ImageUpload/ImageUpload.jsx'
import './PlaceForm.scss' 

const PlaceForm = ({ handleAddPlace, handleUpdatePlace }) => {
  const [formData, setFormData] = useState({
    placeName: '',
    location: '',
    image: '',
    description: '',
  })

  const { placeId } = useParams()

  useEffect(() => {
    const fetchPlace = async () => {
      const singlePlace = await placeService.show(placeId)
      setFormData(singlePlace)
    }
    if (placeId) {
      fetchPlace()
    }
  }, [placeId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (placeId) {
      handleUpdatePlace(placeId, formData)
    } else {
      handleAddPlace(formData)
    }
  }

  const handleImageUpload = (value) => {
    setFormData({...formData, image: value})
  }

  return (
    <Container className="place-form">
      <h1>{ placeId ? 'Update Place' : 'Create Place'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="placeName-input" className="form-group">
          <Form.Label>Name of Place</Form.Label>
          <Form.Control
            required
            type="text"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="location-input" className="form-group">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <ImageUpload 
            name="image"
            label="Upload Image"
            image={formData.image} 
            handleImageUpload={handleImageUpload}
          />
        </Form.Group>
        <Form.Group controlId="description-input" className="form-group">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="btn-container">
          <Button variant="primary" type="submit">SUBMIT</Button>
        </div>
      </Form>
    </Container>
  )
}

export default PlaceForm
