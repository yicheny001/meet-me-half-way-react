var express = require('express')
var app = express();
var Yelp = require('yelp')
var axios = require('axios')

var foursquare = ({
  clientId:'QEAJDDJJEEQOAZHNRNFPNZQ4WPTM05ZBFUYSKG0ZMF3V2UCS',
  clientSecret:'XRC5OOQPKD2TMDU1LA2RRKQ5H3AOEINPU3HMDVZVVRGHACLX',
  version:'20140806'
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

app.listen(3006, function () {
  console.log('Example app listening on port 3006!')
});

app.get('/heycutie/:query/:lat/:lng', function (req, res)  {
  axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.clientId}&client_secret=${foursquare.clientSecret}&v=${foursquare.version}&ll=${req.params.lat},${req.params.lng}&query=${req.params.query}`)
    .then(function (value) {
      var cache = [];
      if (typeof value === 'object' && value !== null) {
       if (cache.indexOf(value) !== -1) {
           return;
       }
       cache.push(value);
   }
   res.json(value);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
