import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* exercise component is implemented as a functional react component - no state or lifecycle methods. Good to accept props and return jsx. */
/* note below: best practice would be to use a button and style as a link for <a> tag. href is going to anything.*/

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

/* exercises list component is implemented as a react class component */

export default class ExercisesList extends Component {  
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        /* initialize the exercises list as an empty array. */
        this.state = {exercises: []};
    }

    /* get a list of exercises from the database. can use just response.data because we want all fields. */
    /* code will run before the page is rendered and add the exercises to the state. */
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data } )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /* method to delete an exercise. */
    /* takes an object ID to delte. MongoDB automatically assigns. */
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            /* log that the exercise has been deleted */
            .then(res => console.log(res.data)); 
        /* delete element from table displayed to user. Note syntax of _id comes from MongoDB. */
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    /* exercise list for render */
    /* for every element in the exercise array, return a compnent - a row of the table */
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise
                exercise={currentexercise}
                deleteExercise={this.deleteExercise} 
                key={currentexercise._id}
                />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration (min)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}