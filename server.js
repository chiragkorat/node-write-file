var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

var app = express()

app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', function (req, res) {
  axios.get('https://www.cmegroup.com/CmeWS/mvc/Quotes/Future/429/G')
    .then(function (response) {
      var jsonContent = JSON.stringify(response.data);
      fs.writeFile("response.json", jsonContent, 'utf8', function (err) {
        if (err) {
          return res.send(err);
        }
        res.send(response.data);
      });
    })
    .catch(function (error) {
      res.send(error);
    })
})

app.listen(3000)