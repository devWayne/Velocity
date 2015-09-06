var fs = require('fs');

//third party
var express = require('express');
var handlebars = require('handlebars');


var app = express(); // the main app

app.get('*',function(req, res) {
  console.log(req._parsedUrl.pathname);
  res.set('Content-Type', 'text/html');

  var _handles = require('./app' + req._parsedUrl.pathname+'.js');
  console.log(_handles);
  var _html = handlebars.compile(_handles);
  res.send(_html({"name":"Jarvan"}));
})


app.listen(7000);
