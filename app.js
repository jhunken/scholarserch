
/**
 * Module dependencies.
 */

var express = require('express')
    , engine = require('ejs-locals')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// all environments
app.set('template_engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/static'));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
var locals = {
    title: 'Node | Express | EJS | Boostrap',
    description: 'A Node.js applicaton bootstrap using Express 3.x, EJS, Twitter Bootstrap, and CSS3',
    author: 'C. Aaron Cois, Alexandre Collin',
    _layoutFile: true
};

//app.get('/', routes.index);
app.get('/', routes.index);
app.get('/stanford', routes.stanford);
app.get('/category', routes.category);
app.get('/about', routes.about);
app.get('/users', user.list);
app.post('/search', routes.search);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
