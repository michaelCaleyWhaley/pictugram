const router = require('express').Router();
const auth = require('../middleware/auth');
const Comment = require('../models/comment');

router.route('/:id').get(auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id)
    .exec()
    .catch((err) => {
      res.status(400).json(`error: ${err}`);
    });

  res.status(200).json(comment);
});
module.exports = router;
