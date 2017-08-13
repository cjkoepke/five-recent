import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

class PostList extends Component {

    render() {
        const posts = this.props.posts
        return (
            <ul className="post-list">
                {posts.map(post => (
                    <Post
                        key={post.id}
                        data={post}
                        onDeletePost={this.props.onDeletePost} />
                ))}
            </ul>
        )
    }
}

PostList.PropTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList
