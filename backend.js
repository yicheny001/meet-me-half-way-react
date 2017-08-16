require('dotenv').config();
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

app.get('/heycutie/:query/:lat/:lng/:radius/:limit/:sortBy/:openNow', function (req, res) {
  var query = req.params.query
  var ll = `${req.params.lat},${req.params.lng}`
  var sort = req.params.sortBy
  var limit = req.params.limit
  var openNow = req.params.openNow
  var { client_id, client_secret, version_number } = process.env
  const requestUrl = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version_number}&ll=${ll}&query=${query}&limit=${limit}&openNow=${openNow}`

  axios.get(requestUrl)
  .then(function (data) {
    var stringifiedData = CircularJSON.stringify(data)
    res.json(stringifiedData);
  })
  .catch(function (err) {
    console.error(err)
  })
});
