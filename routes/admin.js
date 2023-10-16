var express = require('express');
var router = express.Router();
const session = require('express-session');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";

router.get(['/', '/admin:user'], function(req, res, next) {
    ssn = req.session;

    if (req.query.user !== undefined) {
        console.log(req.query.user);
        var msg;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db('HahuProject');
            database.collection('usersprofile').deleteOne({ email: req.query.user }, function(err, res) {
                if (err) {
                    console.log(err);
                }
                req.query.user = null;


            });
            msg = 'User Deleted Successfully!';
        });
    }

    if (!ssn.email)
        res.redirect('login')
    else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db('HahuProject');
            database.collection('usersprofile').find({}).toArray(function(err, users) {
                if (err) {
                    console.log(err);
                }
                if (users) {
                    res.render('admin', { users: users, msg: msg });
                }
            });

        });
    }


});

module.exports = router;