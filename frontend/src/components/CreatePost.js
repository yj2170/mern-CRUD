import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You should login to create post.');
      navigate('/');
    }
  }, [navigate]);

  const submitPost = async () => {
    await axios.post('http://localhost:5000/posts', { title, content });
    navigate('/');
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br />
      <button onClick={submitPost}>Submit</button>
    </div>
  );
};

export default CreatePost;