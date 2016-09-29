var axios = require('axios')
var CircularJSON = require('circular-json')
var express = require('express')
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

app.listen(3006, function () {
  console.log('welcome to meet me halfway ayy lmao')
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
