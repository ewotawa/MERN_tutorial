import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        /* JS classes, call super when defining constructor of subclass. all react components with a constructor should start with a super props call. */
        super(props);

        /* need to tell the methods what 'this' means. */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /* set initial state of component by assigning object to this.state */
        this.state = {
            /* properties of state that correspond to MongoDB document */
            username: ''
        }

    }

    onChangeUsername(e) {
        this.setState({
            /* target = textbox; value = value in textbox */
            /* only updates specified element within the state */
            username: e.target.value
        });
    }

    /* create methods to handle form */
    onSubmit(e) {
        /* prevent default HTML form submit behavior */
        e.preventDefault();

        /* can create variables within a method if only used within method */
        const user = {
            username: this.state.username,
        }

        console.log(user);

        /* submit exercise to the database */
        axios.post('http://localhost:5000/users/add', user)                
            .then(res => console.log(res.data));

        /* keep the user on the Create Users page to set multiple users at a time. */
        this.setState({
            username: ''
        });
    }



    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div> 
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                            />
                    </div>
                </form>
            </div>
            );
    }
}