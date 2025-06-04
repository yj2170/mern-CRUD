import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { buttonStyle } from '../utils/styles';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts');
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      Welcome to my playground
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/edit/${post._id}`} style = {buttonStyle}>Edit</Link>{' '}
            | <button onClick={() => deletePost(post._id)} style = {buttonStyle}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;