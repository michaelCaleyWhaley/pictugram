const router = require('express').Router();

router.route('/').get((req, res) => {
  res.set('Content-Type', 'text/html');

  res
    .status(200)
    .send(
      '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="/favicon-48x48.png"><link rel="stylesheet" href="client-bundle.css"></head><div id="root"></div><script defer type="text/javascript" src="/client-bundle.js"></script>',
    );
});

module.exports = router;
