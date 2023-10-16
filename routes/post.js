var express = require('express');
var router = express.Router();
const session = require('express-session');
var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
var ssn;
router.get('/', function(req, res, next) {
    ssn = req.session;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        database.collection('Issues').find({ postedby: ssn.email }).toArray(function(err, issues) {
            if (err) {
                console.log(err);
            }
            if (issues) {
                res.render('post', { posts: issues });
            }
        });

    });
});

router.put('/post/updatepost:description', function(req, res, next) {
    ssn = req.session;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        var setter = { $set: { description: req.query.description } }
        database.collection('Issues').updateOne({ postedby: ssn.email }, setter, function(err, issues) {
            if (err) {
                console.log(err);
            }
            if (issues) {
                res.render('post', { posts: issues });
            }
        });

    });
});

/*    router.delete('/:description:user', function(req, res, next) {
       ssn = req.session;
       MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var database = db.db('HahuProject');
           // var setter = { $set: { description: req.query.description } }
           database.collection('Issues').deleteOne({ postedby: ssn.email }).toArray(function(err, issues) {
               if (err) {
                   console.log(err);
               }
               if (issues) {
                   res.render('post');
               }
           });

       });
   }); */
module.exports = router;