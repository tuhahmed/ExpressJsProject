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
            var tc = 0;
            var ti = 0;
            var tu = 0;
            database.collection('Comments').count({}, function(ec, c) {
                tc = c;
                database.collection('Issues').count({}, function(ei, i) {
                    ti = i;
                    database.collection('usersprofile').count({}, function(err, u) {
                        tu = u;
                    });
                });
            });


            database.collection('usersprofile').find({}).toArray(function(err, users) {
                if (err) {
                    console.log(err);
                }
                if (users) {
                    res.render('adminanalytics', { users: users, ti: ti, tu: tu, tc: tc });
                }
            });

        });
    }
});
module.exports = router;