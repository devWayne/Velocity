const koa = require('koa');
const path = require('path');
const render = require('koa-ejs');
const fetch = require('node-fetch');

var app = koa();



var routeList = ['/token','/token2'];


var router = require('koa-router')();



render(app, {
  root: path.join(__dirname, 'app'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});

/*
app.use(function *() {
  var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
  yield this.render('content', {
    users: users
  });
});*/

var testGen = function*() {
    var res = yield fetch('http://www.koonpu.com/v/search/keyword_ajax?keyword=1');
    var resJsonObj = yield res.json();
    //console.log(1);
    
    yield this.render('content/content', {
        content: resJsonObj    
    });
}

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});



routeList.forEach((_route, index) => {
  router.get(_route, testGen);
});



app.use(router.routes())


if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(7001);
  console.log('open http://localhost:7001')
}

app.on('error', function(err) {
  console.log(err.stack)
});
