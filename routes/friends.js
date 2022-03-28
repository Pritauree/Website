const express = require('express');
const router = express.Router();
const { readFriends, createFriends, deleteFriends, updateFriends  } = require('../models/friends');

router.post('/addnew', async(req, res) => {
    // note we leave error handling for now and assume our data is created.
    // note: this is not safe code. Any inputs from a user should be validated and sanitised before
    // being saved to the database.
    await createFriends(req.body)
    req.session.friendsdata = { name: req.body.name};
    res.redirect(303, '/friends')
})

router.get('/addnew', (req, res) =>
    res.render('friendform')
);

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readFriends({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
});

// no error checking for now.
//
router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteFriends(name);

    res.redirect(303, '/friends');

});

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readFriends({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('friendeditform', { person: person });
    }
})

router.post('/:name/edit', async (req,res) =>{
    console.table(req.body);
    await updateFriends(req.body);
    
    res.redirect(303, '/friends')

})

router.post('/addnew', async (req, res) => {

    console.table(req.body)
    // note we leave error handling for now and assume our data is created.
    await createFriends(req.body);
    res.redirect(303, '/friends')
})

router.get('/', async (req, res) =>
{
    const friends = await readFriends();

    if (req.session.friendsdata) {
        var newName = req.session.friendsdata.name;
    }
    else {
        var newName = "";
    }
    res.render('friends', { friends: friends, newName: newName })
    
})

module.exports = router;