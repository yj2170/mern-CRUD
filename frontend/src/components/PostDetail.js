import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.userId);
    }

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            alert('Failed to load post.');
            navigate('/');
        }
    };

    fetchPost();
  }, [id, navigate]);

  const deletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Deleted.');
      navigate('/');
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="content-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        {String(post.author?._id || post.author) === String(currentUserId) && (
            <div className="post-button-group">
                <Link to={`/edit/${post._id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={deletePost}>Delete</button>
            </div>
        )}
    </div>
  );
};

export default PostDetail;