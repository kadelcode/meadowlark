const express = require('express');

const app = express();

// set up handlebars view engine
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// use the static middleware
app.use(express.static(__dirname + '/public'));

// middleware to detect `test=1` in the querystring
app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
})

// dynamic information
var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

// Homepage
app.get('/', function (req, res) {
  res.render('home');
});

// About page
app.get('/about', function (req, res) {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {
	  fortune: randomFortune,
	  pageTestScript: '/qa/tests-about.js'
  });
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// run the server
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
                app.get('port') + '; press Ctrl-C to terminate.');
});
