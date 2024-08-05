import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import './App.css'

// Services
import * as placeService from './services/placeService';

export const AuthedUserContext = createContext(null);

const App = () => {
  //const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [place, setPlaces] = useState([])

  // Location variables
  const navigate = useNavigate()

    
  const fetchAllPlaces = async () => {
    const allPlaces = await placeService.index() // Make the API call, receive the data back from the backend server
    setPlaces(allPlaces) // Set the data to state
  }

  useEffect(() => {
    if (user) {
      fetchAllPlaces()
    }
  }, [user])

  const handleDeletePlace = async (placeId) => {
    // Send the DELETE request via our service function
    const deletePlace = await placeService.deletePlace(placeId)
    console.log(deletePlace)
    // Update state to reflect the up to date places list
    await fetchAllPlaces()
    // Navigate to place index
    navigate('/places')
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Routes>
          {user ? (
            <>
              <Route path="/places/:placeId" element={<PlaceDetails handleDeletePlace={handleDeletePlace} />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App