var express = require('express');
const formidable = require('express-formidable'); // 引入


var router = express.Router();
router
  .route('/login/site/api')
  .post(function (req, res) {
    console.log('fields : ', req.fields);
    let result = {
      id: '123',
      password: req.fields.password,
      name: req.fields.name,
      iconURL: '/images/flag.jpg'
    };

    res.json(result);
  });




module.exports = router;
