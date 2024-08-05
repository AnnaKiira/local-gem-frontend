import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PlacesList from './components/PlacesList.jsx'
import PlaceForm from './components/PlaceForm.jsx'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
