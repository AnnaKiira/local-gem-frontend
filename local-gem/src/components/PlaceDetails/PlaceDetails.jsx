import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as placesService from '../../services/placeService.js'
import CommentForm from '../CommentForm/CommentForm.jsx'
import { AuthedUserContext } from '../../App'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const PlaceDetails = ({ handleDeletePlace}) => {
 // Context
 const user = useContext(AuthedUserContext)


 // State
 const [place, setPlace] = useState(null)


 // Location variables
 const { placeId } = useParams()


 useEffect(() => {
   const fetchPlace = async () => {
     const singlePlace = await placesService.show(placeId)
     setPlace(singlePlace)
   }
   fetchPlace()
 }, [placeId])


 const handleAddComment = async (formData) => {
   const newComment = await placesService.createComment(placeId, formData)


   setPlace({
     ...place,
     comments: [...place.comments, newComment]
   })
  
   // Update state
 }

 if (!place) return <main>Loading...</main>

 return (
   <main className="placedetails">
    <Container>
      <Row>
      <Col xs="12">
       <h1>{place.placeName}</h1>
       </Col>
       </Row>
       <Row>
       <Col xs="12">
       <p>
         {place.user.username} posted on
         {new Date(place.createdAt).toLocaleDateString()}
       </p>
     </header>

     {place.image && (
      <div className="upload-image" style={{backgroundImage: `url(${place.image})`}}> </div>)}
     <p>{place.description}</p>

     {/* UPDATE/DELETE */}
     { place.user._id === user._id &&
       <section>
         <button onClick={() => handleDeletePlace(placeId)}>Delete Place</button>
         <Link to={`/places/${placeId}/edit`}>Update Place</Link>
       </section>
     }

     <section>
       <h2>Comments</h2>
       {!place.comments.length && <p>There are no comments.</p>}
       {place.comments.map((comment) => (
        
         <div key={comment._id}>
             <p>
               {comment.user.username} posted on
               {new Date(comment.createdAt).toLocaleDateString()}
             </p>
           <p>{comment.text}</p>
         </div>
       ))}
       <CommentForm handleAddComment={handleAddComment} />
     </section>

     </Col>
</Row>
</Container>
</main>
 
 )
}

export default PlaceDetails

