var express = require('express');

const axios = require("axios");

var router = express.Router();
var ssn;
var covid;
var stats;
/* GET home page. */

router.get('/', function(req, res, next) {

    const options = {
        method: 'GET',
        url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total',
        params: { country: 'Canada' },
        headers: {
            'X-RapidAPI-Key': '1595e3f681msh94806bc2bf8d676p1fbb1cjsn1cab526a03f4',
            'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
        }
    };

    axios.request(options).then(function(response) {
        covid = response.data;
        //console.log(response.data);
    }).catch(function(error) {
        console.error(error);
    });

    const options1 = {
        method: 'GET',
        url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats',
        params: { country: 'Canada' },
        headers: {
            'X-RapidAPI-Key': '1595e3f681msh94806bc2bf8d676p1fbb1cjsn1cab526a03f4',
            'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
        }
    };

    axios.request(options1).then(function(response) {
        stats = response.data;
        //console.log(response.data.covid19Stats);
    }).catch(function(error) {
        console.error(error);
    });
    res.render('index', { covid: covid, stat: stats });
});
router.get('/index/isAuthenticated', function(req, res, next) {
    ssn = req.session;
    var isAdmin = false;
    var isAuthenticated = false;
    if (ssn.email)
        isAuthenticated = true;
    if (ssn.isadmin) {
        if (ssn.isadmin == 'admin')
            isAdmin = true;
    }
    res.send({ isAuthenticated: isAuthenticated, isAdmin: isAdmin });
});
module.exports = router;