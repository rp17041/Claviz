// Included node_modules

const express = require('express');
const app = express();
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const bitpayRates = require("bitpay-rates");
app.use(bodyParser());

///             First endpoint              /////

const code = "EUR";
bitpayRates.get(code, (err, res) => {
  console.log("Callback Rate:", res);
});


request({
    url: 'https://blockchain.info/stats?format=json',
    json: true
}, function(error, response, body){
  btcPrice = body.market_price_usd;
});

app.get('/btc', function (req, res) {
    res.send('Price of BTC is ' + btcPrice);
});


////      Second endpont in working progress       ///

var cities = require('./node_modules/country-json/src/country-by-capital-city.json')

app.get('/capital', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
var input = request.body;

pos = cities.map(function(e) { return e.country; }).indexOf('Latvia');
//console.log(input);
console.log(cities[pos]);

app.post('/capital', (req, res) => {
    res.send('Capital of ' + pos);
    //res.end(JSON.stringify(req.body));
});

//////              Third endpoint             ///////////

var xlsx = require("xlsx");
var wb = xlsx.readFile("data.xlsx");
var ws = wb.Sheets["Sheet1"];
var data = xlsx.utils.sheet_to_csv(ws);

function sum(obj){
  var result= 0;
  var numberStr = "";

  for(var i = 0; i < obj.length; i++) {
    while (obj[i] >= '0' && obj[i]<='9') {
        numberStr += obj[i];
        i++;
    }
    if (numberStr != "") {
      result += Number.parseInt(numberStr);
      numberStr = "";
    }
  }
  return result;
}

var sumNumbers = sum(data);

app.get('/excel-sum', function (req, res) {
    res.send('Sum is  ' + sumNumbers);
});

/////////////////////////////////////////////////

app.listen(3000);
