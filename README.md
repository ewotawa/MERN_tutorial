# Build and Exercise Tracker app with the MERN stack.

Check out [this video](https://youtu.be/7CqJlxBYj-M) and [this article](https://www.mongodb.com/blog/post/building-an-exercise-tracker-mern-tutorial?utm_campaign=Int_CLD_MERN%20Stack%20Tutorial_06_20_WW_Autoresponder&utm_source=eloqua&utm_medium=email&utm_term=Learn%20MERN%20with%20MongoDB) for a step-by-step how-to.

The instructions below assume that the repo is cloned into a folder called `mern-exercise-tracker`.

## To start the backend server
Open the project folder in the terminal. 
Use the `cd` command to drill into `.../mern-exercise-tracker/backend`.
Type the command:

    nodemon server

## To start the frontend server
Open the project folder in the terminal.
Use the `cd` command to drill into `.../mern-exercise-tracker/`.
Type the command:

    npm start

## Backend Environment Variables
This app requires a [MongoDB Atlas](https://cloud.mongodb.com/) cluster. You will need to create a MongoDB Atlas account (a free tier is avaialble) and to set up a cluster as detailed in the instructions linked above. 

You will need to create an environment variable for the connection string to the cluster. More detailed notes are provided in the article and video referenced above. In short:
* Create a new MongoDB cluster.
* Create a user ID and password for the MongoDB cluster.
* Create a new file in the `backend` folder called `.env`.
* In that file add the text `ATLAS_URI=`.
* After the equal sign, paste the connection string.
* Where you see `<password>`, replace the text with the password for your Cluster user ID (not your MongoDB account ID). Note that the password string needs to be [URL encoded](https://dochub.mongodb.org/core/atlas-url-encoding).
* Where you see `<database>`, replace the text with the word `test`.
* Save the file. 

The file `.env` is included in the `.gitignore` file of this build and is not posted to GitHub with a commit.

## Package synchronization
Open a terminal window and `cd` into the `.../mern-exercise-tracker/` directory.
To reset npm packages on your local system, enter the following command into the terminal:

    rm -rf node_modules

To install the packages necessary to run this app, enter the following into the terminal:

    npm install.

`cd` into the `.../mern-exercise-tracker/backend/` directory and repeat the process.

## Note on Bootstrap
At the time of this project, using Bootstrap, installed as follows:

    npm install bootstrap

results in an error in Chrome DevTools:

    DevTools failed to load SourceMap: Could not load content for http://localhost:3000/bootstrap.min.css.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE

To see console logging mentioned in the video:
* launch the front-end server using `npm start` as described above.
* Open Chrome DevTools (`CTRL + SHIFT + I)`
* Open the Settings cog in the top right-hand corner.
* Uncheck the box **Enable CSS source maps**
* Close Settings.
* Click and hold the mouse over the Reload button. Select **empty cache and hard reload**.
