var express = require('express');
let editor = '-init-';

var router = express.Router();
router
  .route('/')
  .get((req, res) => {
    res.send(editor);
  })
  .put((req, res) => {
    editor = req.body;
    console.log(req.body);
  });

module.exports = router;
