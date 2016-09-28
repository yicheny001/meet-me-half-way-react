var axios = require('axios')
var CircularJSON = require('circular-json')
var express = require('express')
var app = express();
var Yelp = require('yelp')

// Client ID
// BHEG2XXZ2ZHKVQQAT1ZOJTF1GZX2VF1HLDNPWWBZJLDNMUDN
//
// Client Secret
// 4MOFLTHLVYDX1BZCMRPD2250EAZWIPBXQJT5ZREZANUGWGSJ

var yelp = new Yelp({
  consumer_key: '4AIXQ14932qe-duLC8923w',
  consumer_secret: 'NYO2mSLJri2TteQ6-H-vsOo457E',
  token: 'xKvgmNwypC9LKsKc5L1bk-v-2xgDlBYn',
  token_secret: 'Ic7fR4OiXaawmBTFtEBinrg4-GM',
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

app.listen(3006, function () {
  console.log('Example app listening on port 3006!')
});

app.get('/heycutie/:query/:lat/:lng/:radius/:limit/:sortBy', function (req, res) {
  var query = req.params.query
  var ll = `${req.params.lat},${req.params.lng}`
  var sort = req.params.sortBy
  var limit = req.params.limit
  axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=BHEG2XXZ2ZHKVQQAT1ZOJTF1GZX2VF1HLDNPWWBZJLDNMUDN&client_secret=4MOFLTHLVYDX1BZCMRPD2250EAZWIPBXQJT5ZREZANUGWGSJ&v=20130815&ll=${ll}&query=${query}&limit=${limit}`)
  .then(function (data) {
    var stringifiedData = CircularJSON.stringify(data)
    res.json(stringifiedData);
  })
  .catch(function (err) {
    console.error(err)
  })
});

app.get('/heycutie/:businessID', function (req, res) {
  yelp.business(req.params.businessID)
  .then(function (data) {
    console.log(data)
    res.json(data)
  })
  .catch(function (err) {
    console.error(err);
  })
})
