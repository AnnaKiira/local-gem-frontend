import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as placesService from '../../services/placeService.js'
import CommentForm from '../CommentForm/CommentForm.jsx'
import { AuthedUserContext } from '../../App'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./PlaceDetails.scss"


const PlaceDetails = ({ handleDeletePlace}) => {
 
 const user = useContext(AuthedUserContext)



 const [place, setPlace] = useState(null)


 
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
 }

 if (!place) return <main>Loading...</main>

 return (
   <main className="placedetails">
    <Container className="containerplace">
      <Row>
      <Col xs="12" className="showtitle">
       <h1>{place.placeName}</h1>
       </Col>
       </Row>
       <Row>
       <Col xs="12">
       <p>
        posted by {place.user.username}
       </p>


     {place.image && (
      <div className="upload-image" style={{backgroundImage: `url(${place.image})`}}> </div>)}
     <p className= "description-card">{place.description}</p>
</Col>
</Row>
<Row className="commentsrow">
<Col className= "commentsall">
     <CommentForm handleAddComment={handleAddComment} />
       {!place.comments.length && <p>There are no comments.</p>}

 
       {place.comments.map((comment) => (
                 <article key={comment._id}>
             <div className="card">  
             <h6 className="card-title">
               {comment.user.username} said: 
             </h6>
           <p className="card-text">{comment.text}</p>
           </div>
           </article>


       ))}

     </Col>
</Row>
<Row>
       { place.user._id === user._id &&
       <section>
         <button className="del-button" onClick={() => handleDeletePlace(placeId)}>Delete Place</button>
         <Link className="update-button" to={`/places/${placeId}/edit`}>Update Place</Link>
       </section>
     }
</Row>
</Container>
</main>
 
 )
}

export default PlaceDetails

