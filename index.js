const express = require('express');
const fs = require('fs');

const app = express();

app.get("/", (req, res) => {
  res.redirect("/about");
})

app.get(/(about|simulate|build)$/, (req, res) => {
  res.sendFile(__dirname + '/website/index.html')
})

app.use(express.static('website'));

app.listen(8080);