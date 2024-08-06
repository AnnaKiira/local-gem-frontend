//import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState} from 'react'
//import PlacesList from './components/PlacesList.jsx'
//import PlaceForm from './components/PlaceForm.jsx'
import * as authService from '../src/services/authService.js'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'
import Landing from './components/Landing/LandingPage.jsx'
import PlacesList from './components/Places/PlacesList.jsx'
import Navbar from './components/navbar/navbar.jsx'

function App() {
  const [user, setUser] = useState(authService.getUser())

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }




  return (
    <>
    {/* <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/places">Places</Link>
            </li>
            <li>
              <Link to="/places/new">Add Place</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/places" element={<PlacesList />} />
          <Route path="/places/new" element={<PlaceForm />} />
        </Routes>
      </div>
    </Router> */}
    <Router>
    <Navbar user={user} handleSignout={handleSignout} />
      <Routes>
      {user ? (
        <>
        <Route path="/places" element={<PlacesList />} /> 
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
