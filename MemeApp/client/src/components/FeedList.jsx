// This is the page for the news feed
import React, { Component } from 'react';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: null,
      postListLoaded: false,
      current_user: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('/posts')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          postList: res.posts,
          postListLoaded: true
        })
      }).catch(err => console.log(err));
    }, 2800);
  }

  renderPosts() {
    const style = {
      body: {
        backgroundColor: '#FFFFF7',
        height: '100%'
      }
    }
    return this.state.postList.map(post => {
      return (
        <div className="post" key={post.id} style={style}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {
            post.url ?
            <img src={`${post.url}`} alt="" width={500} height={400} mode='fit' />
            : <p>No Image</p>
          }
        </div>
      )
    })
  }

  render() {
    return (
      <div className="post-list">
        {this.state.postListLoaded ?
          this.renderPosts() : <img src='https://cdn.dribbble.com/users/503653/screenshots/3143656/fluid-loader.gif' alt='' />
        }
      </div>
    )
  }
}

export default PostList;
