var express = require('express');
var router = express.Router();
const session = require('express-session');
const md5 = require('md5');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
var ssn;
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('login');
});
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var pss = req.body.password;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        database.collection('usersprofile').findOne({ email: email, password: pss },
            function(err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    ssn = req.session;
                    ssn.email = email;
                    ssn.firstname = user.firstname;
                    ssn.isadmin = user.role;

                    db.close();
                    res.redirect('profile');
                } else {
                    res.render('login', { error: "Incorrect Email or Password" });
                }

            });

    });


});
module.exports = router;