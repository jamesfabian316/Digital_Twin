import React, { useState } from 'react'
import './Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'user' && password === 'password') {
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <img
          src='/images/ltts_logo.png'
          alt='LTTS Logo'
          className='login-logo'
        />
      </div>
      <div className='login-right'>
        <div className='login-form-container'>
          <h2 className='login-title'>Sign In</h2>
          {error && <div className='error-message'>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
              />
            </div>
            <button
              type='submit'
              className='login-button'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
