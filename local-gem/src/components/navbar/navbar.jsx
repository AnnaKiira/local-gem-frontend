import {Link} from 'react-router-dom'

const Navbar = ({user, handleSignout}) => {
    return (
      <>
      {user ? (
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
          <li><Link to="" onClick={handleSignout}>Sign Out</Link>
          </li>
        </ul>
      </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
      </>
    )
}
  
export default Navbar