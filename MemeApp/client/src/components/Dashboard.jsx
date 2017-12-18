import React, { Component } from 'react'

import Auth from '../modules/Auth'
import AddPostForm from './AddPostForm'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPosts: 0,
      postsLoaded: false,
      current_user: null,
    }
  }

  componentDidMount() {
    this.getUserPosts();
  }

  getUserPosts() {
    fetch('/profile', {
      method: 'GET',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          current_user: res.user.username,
          myPosts: res.posts,
          postsLoaded: true,
        })
      }).catch(err => console.log(err));
  }

  addPost(e, data) {
    fetch('/posts', {
      method: "POST",
      headers: {
        'Content-Type': 'application.json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
      body: JSON.stringify({
        post: data,
      }),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.getUserPosts();
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="dash">
        <AddPostForm addPost={this.addPost} />
        {this.state.myPosts ?
          this.state.myPosts.map(post => {
            return (<h1 key={post.id}>{post.title}</h1>)
          })
          : <p>Loading...</p>
        }

        <h1>Hello {this.state.current_user}</h1>
        <h1>You got {this.state.myPosts.length} posts, ma guy! <br />Go to the feed to create a post!</h1>
        <img src={`${this.state.myPosts.url}`} alt="" width={500} height={400} mode='fit' />
      </div>
    )
  }
}

export default Dashboard
