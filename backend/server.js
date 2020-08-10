/* note: to launch the backened server, cd into .../mern-exercise-tracker/backend. Command: nodemon server */

/* require all the things we're going to need */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* configures environment variables in the dotenv file */
require('dotenv').config();

/* create the express server */
const app = express();
const port = process.env.PORT || 5000;

/* middleware */
/* express middleware allows to parse json - server will be sending and receiving json*/
app.use(cors());
app.use(express.json());

/* establish MongoDB connection */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,  /* MongoDB, nodejs driver rewrote tool it uses to parse mongodb connection strings. */
    useCreateIndex: true    /* deals with MongoDB deprecating ensure index function. */
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
})

/* tell the server to use the routes */
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

/* start the server */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});