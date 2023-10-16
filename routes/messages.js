var express = require('express');
var router = express.Router();
const session = require('express-session');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
/* GET home page. */
var msgLists;
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('TestDB');
        database.collection('messages')
            .find({})
            .toArray(function(err, msgs) {
                console.log(msgs);
                msgLists = msgs;
                console.log(msgLists);
            });
    });
    res.render('messages', { messagesList: msgLists });
});


module.exports = router;