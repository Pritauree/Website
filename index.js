const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000
const home = require('./routes/home')
const friends = require('./routes/friends')
const { newsMiddleware } = require('./lib/middleware');

app.use(cookieParser("Una is great !"));
app.use(express.static('public'));
app.use(newsMiddleware)
app.use('/', home)
app.use('/friends', friends)

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