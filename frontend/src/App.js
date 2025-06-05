import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() / 1000 > payload.exp) {
      localStorage.removeItem('token');
    }
  }
  }, []);

  return (
      <Router>
      <Layout auth={auth} setAuth={setAuth}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Layout>
      </Router>
  );
}

export default App;