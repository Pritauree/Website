const express = require('express');
const router = express.Router();

const linksForHome = 
[ {url: 'about' , text : 'About'},
{ url: 'contact', text : 'Contact'},
{url: 'friends', text : 'Friends'}];

router.get('/',  (req, res) => {

    var message = "";
     
    if (req.signedCookies.tracking)
    {
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on : " + dateLastVisit;
    }

    var currentDate = new Date();
    res.cookie('tracking',currentDate.toDateString(), {signed : true});
    res.render('home', {'message': message, data : linksForHome});
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact',  (req, res) => {
    res.render('contact');
});

module.exports = router;

