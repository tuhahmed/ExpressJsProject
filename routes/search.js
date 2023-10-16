var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";

router.get('/', function(req, res, next) {
    res.render('search', { posts: null, msg: '' });
});

router.post('', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        var searchKey = req.body.search;
        var q = { $or: [{ description: { '$regex': searchKey, '$options': 'i' } }, { title: { '$regex': searchKey, '$options': 'i' } }] };
        database.collection('Issues').find(q).toArray(function(err, issues) {
            if (err) {
                console.log(err);
                issues = {};
                res.render('search', { posts: issues, msg: 'No Result Found ' + searchKey });
            }
            if (issues) {
                res.render('search', { posts: issues, msg: "[ " + searchKey + " ]  " + issues.length + " results found." });
            }
        });

    });
});

module.exports = router;