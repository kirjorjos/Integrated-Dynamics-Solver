const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('website'));

app.get('/', (req, res) => {
  fs.readFile('website/about/about.html', (err, data) => {
    res.set('Content-Type', 'text/html');
    res.send(data);
  });
});

app.listen(8080);