import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as placeService from '../../services/placeService'; 
import './UserProfile.scss';

const UserProfile = ({ user }) => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      const userPlaces = await placeService.getUserPlaces(user._id);
      setPlaces(userPlaces);
    };

    fetchPlaces();
  }, [user._id]);

  const handleCardClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  return (
    <div className="user-profile">
      <h1>Welcome {user.username}</h1>
      <h2>Your Places</h2>
      <div className="places-list">
        {places.length > 0 ? (
          places.map((place) => (
            <div 
              key={place._id} 
              onClick={() => handleCardClick(place._id)} 
              className="place-card-link"
            >
              <div className="place-card">
                <header>
                  <h2>{place.placeName}</h2>
                  <p>
                    {place.user.username} posted on{' '}
                    {new Date(place.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <p>{place.description}</p>
                {place.image && (
                  <div className="upload-image" style={{ backgroundImage: `url(${place.image})` }}></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>You have not made any places yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
