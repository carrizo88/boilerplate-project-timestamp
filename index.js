// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




app.get("/api/:date", function (req, res) {
  console.log('req',req.params)
  const date = req.params.date;
  const dateNow =  Date.now(date)
  //const unix =  getUtcDate(date).getTime();

  const utcInitial = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
  const utcGenerate =  getUtcDate(date)
  const unix = parseInt((utcGenerate / 1000).toFixed(0))
  const unix2 = parseInt(utcGenerate)
  console.log('sape',date ,'.,,-',
  unix,'-----',unix,'---',unix2,'-----',utcGenerate,'.-----',utcInitial
  )
  res.json({
    unix,
    utc:utcGenerate.toUTCString()
  });
});

const getUtcDate= (date)=> {
  const newDate = new Date(date)
  const year = newDate.getFullYear() 
  const month = newDate.getMonth()
  const day = newDate.getDay()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()
  const dateUtc = new Date(`${day} ${month} ${year} ${hour}:${minute}:${second} PDT`);
   
console.log(`UT ${dateUtc.getTime()}`)
  return dateUtc;
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
