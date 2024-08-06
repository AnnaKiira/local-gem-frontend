import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState} from 'react'
import * as authService from '../src/services/authService.js'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'
import Landing from './components/Landing/LandingPage.jsx'
import PlacesList from './components/Places/PlacesList.jsx'
import PlaceForm from '../components/Places/PlaceForm.jsx'
import Navbar from './components/navbar/navbar.jsx'
import UserProfile from './components/UserProfile/UserProfile.jsx'

function App() {
  const [user, setUser] = useState(authService.getUser())

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }




  return (
    <>
    {}
    <Router>
    <Navbar user={user} handleSignout={handleSignout} />
      <Routes>
      {user ? (
        <>
        <Route path="/" element={<UserProfile user={user} />} />
        <Route path="/places" element={<PlacesList />} /> 
        <Route path="/places/new" element={<PlaceForm />} />

        </>
         ) : (
          <Route path="/" element={<Landing />} /> 
         )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </Router>
      </>
  )
}

export default App
