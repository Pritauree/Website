const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000
const home = require('./routes/home')
const friends = require('./routes/friends')
const { newsMiddleware } = require('./lib/middleware');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(session(
  {secret: "Una is great",
  cookie: { maxage: 6000},
  resave: false,
  saveUnitialized: false
}))
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser("Una is great !"));
app.use(express.static('public'));
app.use(newsMiddleware)
app.use('/', home)
app.use('/friends', friends)

const connectionString = 'mongodb://127.0.0.1:27017/SS2022'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }).
  catch ( error => {
    console.log('Database connection refused' + error);
    process.exit(2);
  })
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  
  db.once('open', () => {
    console.log("DB connected");
  });

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))