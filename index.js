require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const directory = {currentIndex: 0};
const directory2 = {};
let bodyParser = require('body-parser');
const dns = require('dns');
app.use(bodyParser.urlencoded({extended: false}));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  let url = req.body.url;

  dns.lookup(host, (err, address, family) => {
    if (err) {
      res.json({error: 'invalid url'});
    } else {
        if (directory[url] === undefined) {
          directory[url] = { index: directory.currentIndex }
          directory2[directory.currentIndex] = url;
          directory.currentIndex += 1;
      }

      res.json({url: `${req.body.url}`, short_url: `${directory[url].index}`});
    }
  })

  
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  let shorturl = req.params.shorturl;
  if (directory2[shorturl] !== undefined) {
    res.redirect(301, `${directory2[shorturl]}`)
  }
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
