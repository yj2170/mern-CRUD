const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoute = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/posts', postsRoute);

mongoose.connect('mongodb://localhost:27017/mern-crud')
  .then(() => {
    app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
  });