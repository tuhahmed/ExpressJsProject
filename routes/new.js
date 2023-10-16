var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";

var ssn;
router.get('/', function(req, res, next) {
    ssn = req.session;
    if (ssn.email)
        res.render('new');
    else
        res.redirect('login')
});
router.post('/', function(req, res, next) {
    var title = req.body.title;
    var lg = req.body.language;
    var des = req.body.description; //.text(); //replace(/<\/?[^>]+(>|$)/g, "");;
    var datecd = new Date();


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');

        var newIssue = { title: title, language: lg, description: des, postedby: ssn.email, datecreated: datecd };
        database.collection('Issues').insertOne(
            newIssue,
            function(err, val) {
                if (err) throw err;
                db.close();
                res.redirect('post');
            }
        );
    });
});
module.exports = router;