import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
  }, []);

  return (
    <Router>
      <Layout auth={auth} setAuth={setAuth}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;