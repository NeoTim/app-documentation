var express = require('express');

var app = express();

   app.use(express.static('./'))

app.listen(9001, function() {
  console.log('express server listening on 9000');
})
