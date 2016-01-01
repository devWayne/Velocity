var koa = require('koa');
var app = koa();
var path = require('path');
// Must be used before any router is used
var render = require('koa-ejs');

var rt = require('koa-route');

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});


app.use(function *() {
  var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
  yield this.render('content', {
    users: users
  });
});

if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(7001);
  console.log('open http://localhost:7001')
}

app.on('error', function (err) {
  console.log(err.stack)
});
