const express = require('express');
const fs = require('fs');

const app = express();

app.get("/", (req, res) => {
  res.redirect("/about");
})

app.get(/(about|simulate|build)$/, (req, res) => {
  res.sendFile(__dirname + '/website/index.html')
})
// app.use((req, res, next) => {
//   // Get the file extension
//   const extension = req.url.split('.').pop();
  
//   // Check the file extension
//   switch (extension) {
//     case 'js':
//       res.set('Content-Type', 'text/javascript');
//       break;
//     case 'css':
//       res.set('Content-Type', 'text/css');
//       break;
//     case 'html':
//       res.set('Content-Type', 'text/html');
//       break;
//   }
//   next();
// });
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
//   res.set('Pragma', 'no-cache');
//   res.set('Expires', '0');
//   next();
// });
app.use(express.static('website'));

app.listen(8080);