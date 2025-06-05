const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author', '_id username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const authorId = payload.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Invalid token: no user id' });
    }

    const post = new Post({
      title,
      content,
      author: new mongoose.Types.ObjectId(authorId),
    });

    await post.save();
    res.status(201).json(post);

  } catch (err) {
    console.error('Error in POST /posts:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', '_id username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;