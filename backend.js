var express = require('express');
var app = express();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '4AIXQ14932qe-duLC8923w',
  consumer_secret: 'NYO2mSLJri2TteQ6-H-vsOo457E',
  token: 'xKvgmNwypC9LKsKc5L1bk-v-2xgDlBYn',
  token_secret: 'Ic7fR4OiXaawmBTFtEBinrg4-GM',
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3006, function () {
  console.log('Example app listening on port 3006!');
});

app.get('/heycutie/:food/:lat/:lng/:limit', function (req, res) {
  yelp.search({ term: req.params.food, ll: `${req.params.lat}, ${req.params.lng}`, sort: 2, limit: req.params.limit })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

app.get('/heycutie/:businessID', function (req, res) {
  yelp.business(req.params.businessID)
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    console.error(err);
  });
});
