const express = require('express');
const router = express.Router();

// Create a variable data that will have all the people stored
var data = {
    "Kevin": {
        "name": "Kevin",
        "dob": "26/03/2002",
        "imageurl": "/images/Kevin.png",
        "hobbies": ["Read manga", "Play games", "Running"]
    },

    "Lisa": {
        "name": "Lisa",
        "dob": "28/07/2003",
        "imageurl": "/images/Lisa.png",
        "hobbies": ["Bake cakes", "Play games", "Read manga", "Play piano"]
    },

    "Gabi": {
        "name": "Gabi",
        "dob": "15/11/2002",
        "imageurl": "/images/Gabi.png",
        "hobbies": ["Play games", "Read manga", "Ride a skateboard"]
    }
}

router.get('/:name', (req, res) => {
    var name = req.params.name;
    if (data[name] != undefined)
    {
        res.render('person', { person: data[name] })
    }
    else
    {
        res.render('404')
    }
});


router.get('/', (req, res) => {
    res.render('friends', { friends: data });
});

module.exports = router;