const router = require('express').Router();
const auth = require('../middleware/auth');
const Comment = require('../models/comment');

router.route('/:id').get(auth, (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) res.status(400).json(`error: ${err}`);
    else res.status(200).json(comment);
  });
});
module.exports = router;
