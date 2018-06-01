import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components';

class SingleUser extends Component {

    state = {
        user: {},
        showUpdate: false
    }

    toggleShowUpdate = () => {
        this.setState({ showUpdate: !this.state.showUpdate });
    };

     componentDidMount() {
       this.getSingleUser()}


    removeUser = () => {
        const userId = this.props.match.params.id;
        axios.delete(`/api/users/${userId}`)
            .then(() => {
                this.history.push("/")
            })
            .catch(err => {
                console.log(err);
            });
    };
    getSingleUser = async () => {
        const userId = this.props.match.params.id;
        const res = await axios.get(`/api/users/${userId}`);
        const user = res.data;
        this.setState({ user });
    };


    handleSubmit = (event) => {
        event.preventDefault()
        const transferdata = {
            name: this.state.user.name,
            location: this.state.user.location,
            spoken_languages: this.state.user.spoken_languages,
            learning_interests: this.state.user.learning_interests
        }
        console.log(" transferdata ", transferdata)
        const userId = this.state.user.id;
        axios.put(`/api/users/${userId}`, transferdata)
            .then((res) => {
                console.log('From Server', res.data)
                const user = { ...this.state.user }
                this.setState({ user })
            }).then(() => {
                this.toggleShowUpdate()
            })

    }

    handleChange = (event) => {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    render() {

        return (
            
                <div>
                    <h1></h1>
                    <Link to='/'><button>Go Home</button></Link>
                    <h1>Distinct User</h1>
                <br />
                <div>
                </div>
                    <button onClick={this.removeUser}>Delete User</button>

                    <button onClick={this.toggleShowUpdate}>
                        Update {this.state.user.name}
                    </button>
                {this.state.showUpdate ? <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleChange} type="text" name="name" placeholder={this.state.user.name} />
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={this.handleChange} type="text" name="location" placeholder={this.state.user.location} />
                    </div>
                    <div>
                        <label htmlFor="spoken_languages">Spoken Languages: </label>
                        <input onChange={this.handleChange} type="text" name="spoken_languages" placeholder={this.state.user.spoken_languages} />
                    </div>
                    <div>
                        <label htmlFor="learning_interests">Learning Interests: </label>
                        <input onChange={this.handleChange} type="text" name="learning_interests" placeholder={this.state.user.learning_interests} />
                    </div>

                    <button>Submit</button>
                </form> : null}
                </div>
            
        );
    };
}
export default SingleUser