// SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../utils/styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/auth/signup', { username, password });
      alert('Now you are the member!');
      navigate('/login');
    } catch (err) {
      alert('Failed to signup.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp} style = {buttonStyle}>signup</button>
    </div>
  );
};

export default SignUp;