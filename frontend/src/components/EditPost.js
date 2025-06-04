import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login.');
      navigate('/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setAuthorId(res.data.author);
        setTitle(res.data.title);
        setContent(res.data.content);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = payload.userId;

        if (res.data.author !== currentUserId) {
          alert('You are not allowed to edit.');
          navigate('/');
        }
      } catch (error) {
        alert('Failed to load post.');
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const updatePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/posts/${id}`, 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (error) {
      alert('Failed to edit.');
    }
  };

  return (
    <div className="content-container">
      <h2>Edit Post</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} /><br />
      <button onClick={updatePost}>Update</button>
    </div>
  );
};

export default EditPost;