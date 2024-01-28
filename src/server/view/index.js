const router = require('express').Router();
const { INDEX_HTML } = require('../constants/html');

router.route('/').get((_req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(INDEX_HTML);
});

router.route('/register').get((_req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(INDEX_HTML);
});

router.route('/home').get((_req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(INDEX_HTML);
});

module.exports = router;
