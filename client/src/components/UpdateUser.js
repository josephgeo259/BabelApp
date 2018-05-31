import React, { Component } from "react";
import axios from "axios";

class UpdateUser extends Component {
    state = {
        user: {},
    };

    handleChange = event => {
        const user = { ...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    componentDidMount() {
        const user = this.props;
        this.setState({ user: user });
    }
    handleSubmit = async event => {
        event.preventDefault()
        const transferdata = {
            name: this.state.name,
            location: this.state.location,
            spoken_languages: this.state.spoken_languages,
            learning_interests: this.state.learning_interests
        }}

    editUser = event => {
        event.preventDefault();
        const userId = this.props.user.id;
        const transferdata = this.state.user;
        axios.put(`/api/user/${userId}`, transferdata)
            .then(res => {
                this.setState({ user: res.data });
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                this.props.getSingleUser();
                this.props.toggleShowUpdate();
            });
    };


    render() {
        return(

            <div>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleChange} type="text" name="name" value={this.state.user}/>
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={this.handleChange} type="text" name="location" value={this.state.user} />
                    </div>
                    <div>
                        <label htmlFor="specialty">Spoken Languages: </label>
                        <input onChange={this.handleChange} type="text" name="spoken_languages" value={this.state.user}/>
                    </div>
                    <div>
                        <label htmlFor="learning_interests">Learning Interests: </label>
                        <input onChange={this.handleChange} type="text" name="learning_interests" value={this.state.user}/>
                    </div>

                    <button>Submit</button>
                </form>

            </div>
        )
    }
}

export default UpdateUser;
