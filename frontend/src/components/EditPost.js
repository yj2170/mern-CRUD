import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchPost();
  }, [id]);

  // 게시글 수정 요청
  const updatePost = async () => {
    await axios.put(`http://localhost:5000/posts/${id}`, 
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} /><br />
      <button onClick={updatePost}>Update</button>
    </div>
  );
};

export default EditPost;