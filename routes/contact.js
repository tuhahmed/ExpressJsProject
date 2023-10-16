var express = require('express');
var router = express.Router();
const session = require('express-session');
const md5 = require('md5');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Node Js & Test Express ' });
});

var ssn;
router.post('/', function(req, res, next) {
    ssn = req.session;
    var name = req.body.name;
    var msg = req.body.message;
    var email = req.body.email;
    if (ssn.email != "" && name != "" && email != "" && msg != "") {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db('TestDB');
            var newMsg = { from: ssn.email, name: name, email: email, msg: msg };
            database.collection('messages').insertOne(
                newMsg,
                function(err, val) {
                    if (err) throw err;
                    console.log("message recorded");
                    db.close();
                    res.redirect('/');
                }
            );
        });
    } else {
        res.render('contact', { error: "Fill all the required information!" });
    }

});
module.exports = router;