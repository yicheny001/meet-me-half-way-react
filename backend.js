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

app.get('/heycutie/:query/:lat/:lng', function (req, res) {
  var query = req.params.query
  var ll = `${req.params.lat}%2C%20-${req.params.lng}`
  var url = `https://api.foursquare.com/v2/venues/explore?v=20161016&ll=${req.params.lat},${req.params.lng}&query=${query}&client_id=QEAJDDJJEEQOAZHNRNFPNZQ4WPTM05ZBFUYSKG0ZMF3V2UCS&client_secret=XRC5OOQPKD2TMDU1LA2RRKQ5H3AOEINPU3HMDVZVVRGHACLX`
  axios.get(url)
  .then(function (data) {
    var stringifiedData = CircularJSON.stringify(data)
    res.json(stringifiedData)
  })
  .catch(function (err) {
    console.error(err)
    res.json(error)
  })
})
