import React, { Component } from 'react';

/* react-router-dom makes it easier to route specific urls to different react components. */
/* everything that you want to work with the router needs to be inside a router element. See router tag below*/
import { BrowserRouter as Router, Route } from "react-router-dom";

/* import the bootstrap css */
import "bootstrap/dist/css/bootstrap.min.css"; 

/* import the pages needed for the paths below */
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>
    );
  }
}

export default App;
