import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
padding:  8em;
color: goldenrod;
text-align: center;
background-color: black;
height: 100%;


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

class Comments extends Component {
    state = {
        comments: [],
        weather:'',
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
    // 392b408c7bd150d7f826e6239b2d5c0f

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
            <FormWrapper>
            
                <h1>Welcome to your Comments </h1>

                {commentData}
                <Link to='/'><Button> Go Home</Button></Link>

            
                </FormWrapper>
        );
    }
}

export default Comments;