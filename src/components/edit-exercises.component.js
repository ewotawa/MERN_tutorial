import React, { Component } from 'react';
import axios from 'axios';

/* https://stackoverflow.com/questions/58924147/module-not-found-cant-resolve-react-datepicker */
import DatePicker from 'react-datepicker/dist/react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";

/* note: could refactor to combine edit-exercises and create-exercise. */

export default class EditExercise extends Component {
    constructor(props) {
        /* JS classes, call super when defining constructor of subclass. all react components with a constructor should start with a super props call. */
        super(props);

        /* need to tell the methods what 'this' means. */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /* set initial state of component by assigning object to this.state */
        this.state = {
            /* properties of state that correspond to MongoDB document */
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            /* drop-down menu to select user in database */
            users: []
        }

    }

    /* generate list for username drop-down */
    /* react life cycle method - automatically called right before anything displayed on page.*/
    /* getting the params.id directly from the URL. */
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        
        axios.get('http://localhost:5000/users/')
            .then(response => {
                /* check for a nonzero length user list */
                if (response.data.length > 0) {
                    this.setState({
                        /* data will be in an array. need to map the array. Return something for every element in array. */
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    /* add methods to update state properties */

    onChangeUsername(e) {
        this.setState({
            /* target = textbox; value = value in textbox */
            /* only updates specified element within the state */
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            /* here, receiving input from a drop-down calendar.  */
            date: date
        });
    }

    /* create methods to handle form */
    onSubmit(e) {
        /* prevent default HTML form submit behavior */
        e.preventDefault();

        /* can create variables within a method if only used within method */
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        /* submit exercise to the database */
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)                
            .then(res => console.log(res.data));

        /* submit exercise to the database */

        /* take user back to list of exercises */
        window.location = '/'; 
    }




    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user}
                                            value={user}>
                                                {user}
                                        </option>;
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}