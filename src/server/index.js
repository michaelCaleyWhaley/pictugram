const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const commentRouter = require('./controllers/comment');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const { connection } = mongoose;
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Database connection established');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port: ${port}`);
});
