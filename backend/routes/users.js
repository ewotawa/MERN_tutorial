const router = require('express').Router();

/* mongoose model */
let User = require('../models/user.model');

/* Route 0: first endpoint that handles incoming HTTP GET requests on the /users url. (localhost:5000/users/) */
router.route('/').get((req, res) => {
    /* mongoose .find() method: gets a list of all the users from the MongoDB Atlas database. Returns a promise. */
    User.find()  
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/* Route 1: handles HTTP POST requests. */
router.route('/add').post((req, res) => {
    /* new username is part of the request body. */
    const username = req.body.username;

    /* create a new instance of user */
    const newUser = new User({username});

    /* save new username to the database */
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/* Full production would also define UPDATE and DELETE */ 

module.exports = router;