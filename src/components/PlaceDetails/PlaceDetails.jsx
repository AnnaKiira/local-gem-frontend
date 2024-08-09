import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as placesService from '../../services/placeService.js';
import CommentForm from '../CommentForm/CommentForm.jsx';
import { AuthedUserContext } from '../../App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PlaceDetails.scss';

const PlaceDetails = ({ handleDeletePlace }) => {
  const user = useContext(AuthedUserContext);
  const [place, setPlace] = useState(null);
  const { placeId } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      const singlePlace = await placesService.show(placeId);
      setPlace(singlePlace);
    };
    fetchPlace();
  }, [placeId]);

  const handleAddComment = async (formData) => {
    const newComment = await placesService.createComment(placeId, formData);

    setPlace({
      ...place,
      comments: [...place.comments, newComment],
    });
  };

  if (!place) return <main>Loading...</main>;

  return (
    <main className="place-details-container">
      <Container>
        <Row>
          <Col xs="12" className="text-center mb-4">
            <h1 className="place-title">{place.placeName}</h1>
            <p className="post-details">
              {place.user.username} posted on{' '}
              {new Date(place.createdAt).toLocaleDateString()}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-center">
            {place.image && (
              <div
                className="upload-image"
                style={{ backgroundImage: `url(${place.image})` }}
              ></div>
            )}
            <p className="place-description">{place.description}</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-center">
            {place.user._id === user._id && (
              <div className="action-buttons">
                <button
                  className="del-button btn btn-danger"
                  onClick={() => handleDeletePlace(placeId)}
                >
                  Delete Place
                </button>
                <Link
                  className="update-button btn btn-primary"
                  to={`/places/${placeId}/edit`}
                >
                  Update Place
                </Link>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <h2 className="comments-title">Comments</h2>
            {!place.comments.length && <p>There are no comments.</p>}
            {place.comments.map((comment) => (
              <div key={comment._id} className="comment-card card mb-3">
                <div className="card-body">
                  <h6 className="card-title">
                    {comment.user.username} posted on{' '}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </h6>
                  <p className="card-text">{comment.text}</p>
                </div>
              </div>
            ))}
            <div className="add-comment-section">
              <label htmlFor="comment">Your comment:</label>
              <CommentForm handleAddComment={handleAddComment} />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PlaceDetails;
