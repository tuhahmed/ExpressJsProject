var express = require('express');
var fs = require('fs');
var router = express.Router();
var ssn;
/* GET home page. */
/* router.get(['/', '/profile, /profile:id'], function(req, res, next) {
    ssn = req.session;
    console.log('check session');
    console.log(req.query.id);
    res.render('profile');
}); */

var MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Tuha:test12345@cluster0.ejshd3l.mongodb.net/?retryWrites=true&w=majority";
var userinfo = '';
router.get(['/', '/profile, /profile:id'], function(req, res, next) {
    ssn = req.session;

    if (req.query.id == undefined)
        userinfo = ssn.email;
    else
        userinfo = req.query.id;

    console.log(ssn.email);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db('HahuProject');
        console.log(req.query.id);
        database.collection('usersprofile').findOne({ email: userinfo },
            function(err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    //console.log(user);
                    res.render('profile', { user: user });
                }
            });

    });
});
/* router.post('/', function(req, res) {
    console.log();
    ins = fs.createReadStream(req.body.photo.path);
    ous = fs.createWriteStream('../public/images/' + files.photo.filename);
    util.pump(ins, ous, function(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/photos');
        }
    });
    //console.log('\nUploaded %s to %s', files.photo.filename, files.photo.path);
    //res.send('Uploaded ' + files.photo.filename + ' to ' + files.photo.path);

}); */
module.exports = router;