import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const SignupForm = (props) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    hashedPassword: '',
    passwordConf: '',
  });

  const updateMessage = (message) => {
    setMessage(message);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newUser = await authService.signup(formData)
      props.setUser(newUser.user)
      navigate('/')
    } catch (error) {
      updateMessage(error.message)
    }
  };

  const {email, username, hashedPassword, passwordConf} = formData

  const isFormInvalid = () => {
    return !(email && username && hashedPassword && hashedPassword === passwordConf)
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="hashedPassword">Password:</label>
          <input
            type="hashedPassword"
            id="hashedPassword"
            value={hashedPassword}
            name="hashedPassword"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SignupForm;