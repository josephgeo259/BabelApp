import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UpdateUser from './UpdateUser';
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
       this.getSingleUser();}

    getSingleUser = async () => {
            const userId = this.props.match.params.id;
            const res = await axios.get(`/api/users/${userId}`);
            const user = res.data;
            this.setState({ user });
             };

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

    handleSubmit = async event => {
        event.preventDefault()
        const transferdata = {
            name: this.state.name,
            location: this.state.location,
            spoken_languages: this.state.spoken_languages,
            learning_interests: this.state.learning_interests
        }
        await axios.post('/api/users', transferdata);
        await this.props.getAllUsers()
    }

    handleChange = (changedUser, event) => {
        const users = [...this.state.users]
        const newUsers = users.map((user) => {
            if (user.id === changedUser.id) {
                user[event.target.name] = event.target.value
            }
            return user
        })
        this.setState({ users: newUsers })
    }

    updateUser = (user) => {
        console.log("updating the user in the db")
        console.log("user Id being Updated", this.state.user.id)
        axios.patch(`/api/users/${this.state.user._id}${user.id}`, { user })
            .then(res => {
                this.setState({ users: res.data.user })
            })
    }

    render() {
        return (
            
                <div>
                    <h1></h1>
                    <Link to='/'><button>Go Home</button></Link>
                    <button onClick={this.removeUser}>Delete User</button>
                

                    <button onClick={this.toggleShowUpdate}>
                        Update {this.state.user.name}
                    </button>
                    {this.state.updateUser ? (
                        <UpdateUser
                            user={this.state.user}
                            toggleShowUpdate={this.toggleShowUpdate}
                            getSingleUser={this.getSingleUser}
                        />
                    ) : null}
                </div>
            
        );
    };
}
export default SingleUser