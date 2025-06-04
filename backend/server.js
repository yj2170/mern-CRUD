// backend 진입점
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRoute);
app.use('/auth', authRoute);

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/mern-crud';

mongoose.connect(mongoUri)
  .then(() => {
    app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
  })
  .catch((err) => console.error('MongoDB 연결 실패:', err));