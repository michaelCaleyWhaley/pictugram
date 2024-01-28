const router = require('express').Router();
const auth = require('../middleware/auth');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// get all post
router.get('/', auth, async (_req, res) => {
  await Post.find()
    .exec()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json(`error: ${err}`));
});

// add a new post
router.route('/add/:id').post(auth, async (req, res) => {
  const { caption, image } = req.body;
  const { id } = req.params;
  const user = await User.findById(id).exec();
  const newPost = new Post({
    caption,
    image,
    username: user.username,
  });
  newPost
    .save()
    .then(() => res.json('Post Added'))
    .catch((err) => res.status(400).json(err));
});

// add a comment
router.route('/add-comment/:id/:userId').post(auth, async (req, res) => {
  const { id, userId } = req.params;
  const { content } = req.body;
  const user = await User.findById(userId).exec();

  const newContent = new Comment({
    content,
    username: user.username,
  });
  newContent.save().then(() => res.json('Comment Added'));
  const data = await Post.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: newContent } },
  )
    .exec()
    .catch((err) => {
      res.status(400).json(`error: ${err}`);
    });

  res.status(200).json(data);
});

// get a post
router.route('/:id').get(auth, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .exec()
    .catch((err) => {
      res.status(400).json(`error: ${err}`);
    });

  res.status(200).json(post);
});

// get all comments for a post
router.route('/comments/:id').get(auth, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .exec()
    .catch((err) => {
      res.status(400).json(`error: ${err}`);
    });

  res.status(200).json(post.comments);
});
module.exports = router;
