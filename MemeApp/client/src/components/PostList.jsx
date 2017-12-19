// This is the page for the news feed
import React, { Component } from 'react';
import { Section, Title, SubTitle } from 'reactbulma'


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
    return this.state.postList.map(post => {
      return (
        <Section className="post" key={post.id}>
        <h1>{post.username}</h1>
          <Title is='1'><b>{post.title}</b></Title>
          <SubTitle is='1'>{post.description}</SubTitle>
          {
            post.url ?
            <img src={`${post.url}`} alt="" width={500} height={400} mode='fit' />
            : <p>No Image</p>

          }
        </Section>
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
