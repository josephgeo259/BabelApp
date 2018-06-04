import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <div>
                <h1>Welcome to your Blogs </h1>
                            
                        {blogData}
                <Link to='/'><Button> Go Home</Button></Link>

                    </div>
        );
    }
}

export default Blogs;

