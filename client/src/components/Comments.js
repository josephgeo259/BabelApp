import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Comments extends Component {
    state = {
        comments: [],
        showNewForm: false
    }

    componentDidMount() {
        const userId = this.props.match.params.user_id
        this.getCommentsData(userId)
    }

    getCommentsData = async (userId) => {
        try {
            const CommentIt = await axios.get(`/api/users/${userId}/comments`)
            console.log('comments: ', CommentIt.data)
            await this.setState({
                comments: CommentIt.data,

            });
        }
        catch (err) {
            console.log(err)
            await this.setState({ err: err.message })
        }
    }

    // toggleShowNewForm = () => {
    //     this.setState({ showNewForm: !this.state.showNewForm })
    // }

    removeComment = (comment) => {
        console.log('Renove blog asap ')
        axios.delete(`/api/users/${comment.user_id}/comments/${comment.id}`)
            .then(() => {
                this.getCommentsData(comment.user_id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    createComment = (newComment) => {
        console.log('create new comment')
        axios.post('/api/users/:user_id/comments', { newComment })
            .then((res) => {
                console.log(res.data)
                const comments = [this.state.blogs]
                comments.push(res.data)
                this.setState({ comments })
            })
    }


    render() {
        console.log(this.state.blogs)

        const commentData = this.state.comments.map((comment) => {
            return (

                <div key={comment.id}>
                    {/* <Link to={`/users/${comment.id}`}>{comment.title}</Link> */}
                    <br />
                    <h3>Title: {comment.title}</h3>
                    <h3>Description: {comment.description}</h3>

                </div>
            )
        })
        return (
            <div>
                <h1>Welcome to your Comments </h1>

                {commentData}
                <Link to='/'><Button> Go Home</Button></Link>

            </div>
        );
    }
}

export default Comments;