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
   

    handleSumbit = event => {
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
        console.log
        return(

            <div>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleChange} type="text" name="name" value={this.props.user.name}/>
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={this.handleChange} type="text" name="location" value={this.props.user.location} />
                    </div>
                    <div>
                        <label htmlFor="spoken_languages">Spoken Languages: </label>
                        <input onChange={this.handleChange} type="text" name="spoken_languages" value={this.props.user.spoken_languages}/>
                    </div>
                    <div>
                        <label htmlFor="learning_interests">Learning Interests: </label>
                        <input onChange={this.handleChange} type="text" name="learning_interests" value={this.props.user.learning_interests}/>
                    </div>

                    <button>Submit</button>
                </form>

            </div>
        )
    }
}

export default UpdateUser;
