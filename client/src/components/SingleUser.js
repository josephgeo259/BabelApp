import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap';
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
}`


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
            <FormWrapper>
                <div>
                    <h1></h1>
                    <Link to='/'><button>Go Home</button></Link>
                    <h1>Distinct User</h1>

                <br />
                <div>
                </div>
                <UserWrapper>
                <h3>Name: {this.state.user.name}</h3>
                <h3>Location: {this.state.user.location}</h3>
                <h3>Spoken Languages: {this.state.user.spoken_languages}</h3>
                <h3>Learning Interests: {this.state.user.learning_interests}</h3>
                </UserWrapper >
                    <Button onClick={this.removeUser}>Delete User</Button>

                    <Button onClick={this.toggleShowUpdate}>
                        Update {this.state.user.name}
                    </Button>
                <Link to={`/users/${this.state.user.id}/comments`}><Button>Go to my Comments </Button></Link>
                <Link to={`/users/${this.state.user.id}/blogs`}><Button>Go to my Blogs </Button></Link>

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
            </FormWrapper>
        );
    };
}
export default SingleUser