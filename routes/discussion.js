var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
var ssn;

var issue = '';

router.get(['/', '/discussion', '/discussion:id'], function(req, res, next) {
    if (issue == '')
        issue = req.query.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        console.log(issue);
        database.collection('Issues').findOne({ title: issue }, // "ObjectId('" + req.query.id + "')" },
            function(err, i) {
                if (err) {
                    console.log(err);
                    res.render('new');
                }
                if (i) {
                    database.collection('Comments').find({}).toArray(function(err, cs) {
                        if (err) {
                            console.log(err);
                        }
                        if (cs) {
                            res.render('discussion', { issue: i, comments: cs });
                        }
                    });
                }
            });

    });
});


router.post('/', function(req, res, next) {
    ssn = req.session;
    var answer = req.body.answer;
    var issueid = req.body.issueid;
    var datecd = new Date();
    issue = issueid;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');

        var newIssue = { repliedBy: ssn.email, issueID: issueid, comment: answer, datecreated: datecd, likes: 0 };
        database.collection('Comments').insertOne(
            newIssue,
            function(err, val) {
                if (err) throw err;
                db.close();
                res.redirect('discussion');
            }
        );
    });
});
module.exports = router;