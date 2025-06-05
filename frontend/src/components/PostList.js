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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="content-container">
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>By {post.author?.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;