import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import Blogs from './components/Blogs'
import SingleBlog from './components/SingleBlog'
import Comments from './components/Comments'
import SingleComment from './components/SingleComment'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route exact path="/users/:user_id/blogs" component={Blogs} />
            <Route exact path="/users/user_id/blogs/:id" component={SingleBlog} />
            <Route exact path="/users/:user_id/comments" component={Comments} />
            <Route exact path="/users/user_id/comments/:id" component={SingleComment} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
