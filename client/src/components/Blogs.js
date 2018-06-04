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

class Blogs extends Component {
    state = {
        blogs: [],
        newBlog: {
            title: '',
            description: ''
        },
        showNewForm: false
    }

    componentDidMount() {
        const userId = this.props.match.params.user_id
        this.getBlogsData(userId)
    }

    getBlogsData = async (userId) => {
        try {
            const BlogIt = await axios.get(`/api/users/${userId}/blogs`)
            console.log('Blogs: ', BlogIt.data)
            await this.setState({
                blogs: BlogIt.data,
                
            });
        }
        catch (err) {
            console.log(err)
            await this.setState({ err: err.message })
        }
    }

    toggleShowNewForm = () => {
        this.setState({ showNewForm: !this.state.showNewForm })
    }

    removeBlog = (blog) => {
        console.log('Renove blog asap ')
        axios.delete(`/api/users/${blog.user_id}/blogs/${blog.id}`)
            .then(() => {
                this.getBlogsData(blog.user_id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    createBlog = (newBlog) => {
        console.log('create new blog')
        axios.post('/api/users/:user_id/blogs', { newBlog })
            .then((res) => {
                console.log(res.data)
                const blogs = [this.state.blogs]
                blogs.push(res.data)
                this.setState({ blogs })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const transferdata = {
            title: this.state.blog.title,
            description: this.state.blog.description,
        }
        console.log(" transferdata ", transferdata)
        const blogId = this.state.blog.id;
        axios.post(`/api/users/:user_id/blogs`, transferdata)
            .then((res) => {
                console.log('From Server', res.data)
                const blog = { ...this.state.blog }
                this.setState({ blog })
            }).then(() => {
                this.toggleShowNewForm()
            })

    } 
    
    handleChange = (event) => {
        const name = event.target.name
        const newBlog = { ...this.state.newBlog }
        newBlog[name] = event.target.value
        this.setState(newBlog)
    }

    handleSubmit = async event => {
        event.preventDefault()
        const transferdata = {
            title: this.state.blog.title,
            description: this.state.blog.description,
        }
        await axios.post(`/api/users/:user_id/blogs`, transferdata);
    }

    
  
    render() {
        console.log(this.state.blogs)
     
       const blogData = this.state.blogs.map((blog) => {
            return (
                
                <div key={blog.id}>
                    {/* <Link to={`/users/${blog.id}`}>{blog.title}</Link> */}
                    <br />
                    <h3>Title: {blog.title}</h3>
                    <h3>Post: {blog.post}</h3>
                    <Button onClick={this.removeBlog}>Delete this Blog</Button>

                   <Button  onClick={this.toggleShowNewForm}>Create New User </Button>
                  </div> 
                    
            )
        })
        return (
            <FormWrapper>
            
                <h1>Welcome to your Blogs </h1>
                            
                        {blogData}
                <Link to='/'><Button> Go Home</Button></Link>

             
                </FormWrapper>
        );
    }
}

export default Blogs;

