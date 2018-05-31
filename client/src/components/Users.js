import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import NewUserForm from './NewUserForm'
import SingleUser from './SingleUser';
import styled from 'styled-components';

const UserWrapper = styled.div`
border-radius: 3px;
padding: 0.25em 1em;
margin:.25em 9.5em;
background: transparent;
color: blanchedalmond;
border: 100px black;
text-align: center;
height: 85vh;
background-image: url("https://i.imgur.com/mOSH3st.png?1");

body {
    min-height: 100vh;
    margin: 0 18em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
section {
    flex-grow: 1;
}

a, h3 {
    font-family: 'Bree Serif', serif;
    font-size:65px;
    padding:7px;
}
h1 {
    font-size:130px;
    padding:7px;
}

a {
    margin: 10px;
    padding:10px
}`

const FormWrapper = styled.div`
border-radius: 3px;
width: 100%;
padding:  1em;
color: goldenrod;
text-align: center;
background-color: black;


body {
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
section {
    flex-grow: 3;
}


a, h3 {
    font-family: 'Bree Serif', serif;
    font-size:35px;
    padding:7px;
}
h1 {
    font-family: 'Bree Serif', serif;
    font-size:65px;
    padding:7px;
}

a {
    margin: 10px;
    padding:10px
}

button{
border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: gold;
  border-radius:20px;
  border: 2px solid ;
}`
class Users extends Component {
    state = {
        users: [],
        showNewForm: false
    }
    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios.get('/api/users')
            .then(res => {
                console.log("Saving users to state", res.data)
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.error(err)
            })
    }
    createUser = (newUser) => {
        console.log('create new user called')
        axios.post('/api/users', { newUser })
            .then((res) => {
                const users = [this.state.users]
                users.push(res.data)
                this.setState({ users })
            })
    }



    toggleShowNewForm = () => {
        this.setState({ showNewForm: !this.state.showNewForm })
    }

    render() {

        const usersLinks = this.state.users.map((user) => {
            return (
                <UserWrapper key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <br />
                        <h3>Name: {user.name}</h3>
                        <h3>Location: {user.location}</h3>
                        <h3>Spoken Languages: {user.spoken_languages}</h3>
                        <h3>Learning Interests: {user.learning_interests}</h3>
                </UserWrapper>
            )
        })

        return (
            <FormWrapper>
                    <h1>BABELATOR</h1> <br />

                    <hr />
                    {usersLinks}
                    <button onClick={this.toggleShowNewForm}>Create New User </button>
                    {this.state.showNewForm ? <NewUserForm getAllUsers={this.getAllUsers} /> : null}
            </FormWrapper>
        );
    }
}
export default Users