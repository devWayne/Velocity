var koa = require('koa');
var app = koa();
var path = require('path');
var render = require('koa-ejs');

var routeList = ['/pets/:name', '/pets2/:name'];


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

var pets = {
  list: function*() {
    var names = Object.keys(db);
    this.body = 'pets: ' + names.join(', ');
  },

  show: function*(name) {
    this.body = 'test';
  },
  test: function*() {
    var users = [{
      name: 'Dead Horse'
    }, {
      name: 'Jack'
    }, {
      name: 'Tom'
    }];
    yield this.render('content/content', {
      users: users
    });
  }
};

//app.use(rt.get('/pets/:name', pets.show));


routeList.forEach((_route, index) => {
  router.get(_route, pets.test);

});



app
  .use(router.routes())


if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(7001);
  console.log('open http://localhost:7001')
}

app.on('error', function(err) {
  console.log(err.stack)
});
