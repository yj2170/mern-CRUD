import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { buttonStyle } from './utils/styles';

import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [auth, setAuth] = useState(false);

  // 첫 진입 시 토큰 유무 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>Blog</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style = {buttonStyle}>Home</Link>{' '}
          {auth ? (
            <>
              | <Link to="/create" style = {buttonStyle}>Create</Link>{' '}
              | <button onClick={handleLogout} style = {buttonStyle}>Logout</button>
            </>
          ) : (
            <>
              | <Link to="/login" style = {buttonStyle}>Login</Link>{' '}
              | <Link to="/signup" style = {buttonStyle}>Sign Up</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;