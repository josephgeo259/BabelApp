import React, { Component } from 'react'
import axios from 'axios'

class NewUserForm extends Component {
    state = {
        users: [],
        newUser: {
            name: '',
            location: '',
            spoken_languages: '',
            learning_interests: '',
        }
    }
  
    handleChange = (event) => {
        const name = event.target.name
        const newState = { ...this.state }
        newState[name] = event.target.value
        this.setState(newState)
    }

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

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleChange} type="text" name="name" />
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={this.handleChange} type="text" name="location" />
                    </div>
                    <div>
                        <label htmlFor="specialty">Spoken Languages: </label>
                        <input onChange={this.handleChange} type="text" name="spoken_languages" />
                    </div>
                    <div>
                        <label htmlFor="learning_interests">Learning Interests: </label>
                        <input onChange={this.handleChange} type="text" name="learning_interests" />
                    </div>
                    
                    <button>Submit</button>
                </form>

            </div>
        )

    }
}

export default NewUserForm