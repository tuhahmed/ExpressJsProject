var express = require('express');
var router = express.Router();
const session = require('express-session');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";

router.get('/', function(req, res, next) {
    ssn = req.session;
    if (!ssn.email)
        res.redirect('login')
    else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db('HahuProject');
            database.collection('Issues').find({}).toArray(function(err, posts) {
                if (err) {
                    console.log(err);
                }
                if (posts) {
                    res.render('adminposts', { posts: posts });
                }
            });

        });
    }
});
module.exports = router;