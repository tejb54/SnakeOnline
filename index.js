var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
