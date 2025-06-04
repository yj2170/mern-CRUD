import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

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
    <div className="container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="post-button-group">
            <Link to={`/edit/${post._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;