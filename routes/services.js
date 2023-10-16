var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('services', { title: 'Node Js & Test Express ' });
});

module.exports = router;