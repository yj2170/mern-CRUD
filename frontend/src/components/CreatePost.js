import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { buttonStyle, inputStyle, textareaStyle } from '../utils/styles';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

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
        style = {inputStyle}
      /><br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style = {textareaStyle}
      /><br />
      <button onClick={submitPost} style = {buttonStyle}>Submit</button>
    </div>
  );
};

export default CreatePost;