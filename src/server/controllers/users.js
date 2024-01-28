const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: '3600s',
  });
}

router.route('/register').post(async (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: 'Please Fill All Fields' });
  }

  const newUser = new User({ username, password });
  const existingUser = await User.findOne({ username }).catch(() => {
    return res.status(500).json({ msg: 'Error finding user' });
  });

  if (existingUser) {
    return res.send({ message: 'User Already Exist' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);
  newUser.password = hash;
  const user = await newUser.save();

  const token = generateAccessToken(user.id, user.username);

  return res.json({
    token,
    user,
  });
});

router.route('/login').post(async (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: 'Please Fill All Fields' });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

  const token = generateAccessToken(user.id, user.username);

  return res.json({
    token,
    user,
  });
});

module.exports = router;
