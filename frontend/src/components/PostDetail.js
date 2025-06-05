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
        setCurrentUserId(payload.id);
    }

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/posts/${id}`);
            console.log('Fetched post:', res.data);
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
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            <div className="post-footer"> 
                <p className="author-text">
                By {post.author?.username} | Posted on {new Date(post.createdAt).toLocaleString()}
                </p>

                {currentUserId && String(post.author?._id || post.author) === String(currentUserId) && (
                <div className="post-button-group">
                    <Link to={`/edit/${post._id}`}>
                    <button><strong>Edit</strong></button>
                    </Link>
                    <button onClick={deletePost}><strong>Delete</strong></button>
                </div>
                )}
            </div>
        </div>
        <Link to={`/`}><button><strong>Back to home</strong></button></Link>
    </div>
  );
};

export default PostDetail;