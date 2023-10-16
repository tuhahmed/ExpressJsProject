const path = require("path");
const fs = require("fs");
var express = require('express');
var router = express.Router();
const session = require('express-session');
const md5 = require('md5');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
var ssn;
router.get('/', function(req, res, next) {
    res.render('signup');
});


router.post('/', function(req, res, next) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var address = req.body.address;
    var website = req.body.website;
    var github = req.body.github;
    var linkedin = req.body.linkedin;
    var facebook = req.body.facebook;
    var instagram = req.body.instagram;
    var profession = req.body.profession;
    var twitter = req.body.twitter;
    var role = 'user';
    var fullname = fname + ' ' + lname;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        database.collection('usersprofile').findOne({ email: email },
            function(err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    req.session.destroy();
                    res.render('signup', { error: "User exists" });
                } else {


                    var newUser = { firstname: fname, lastname: lname, email: email, password: password, role: role, phone: phone, address: address, profession: profession, website: website, linkedin: linkedin, github: github, facebook: facebook, instagram: instagram, twitter: twitter, picture: '' };
                    database.collection('usersprofile').insertOne(
                        newUser,
                        function(err, val) {
                            if (err) throw err;

                            db.close();
                            ssn = req.session;
                            ssn.email = email;
                            ssn.name = fullname;
                            ssn.role = role;
                            res.redirect('post');
                        });
                }

            });
    });
});

module.exports = router;