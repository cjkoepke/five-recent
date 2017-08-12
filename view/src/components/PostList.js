import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

class PostList extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         posts: this.props.posts || []
    //     }
    // }

    // componentWillReceiveProps(props) {
    //     const posts = props.posts
    //     this.setState({posts})
    // }

    render() {
        const posts = this.props.posts
        return (
            <ul className="post-list">
                {posts.map(post => (
                    <Post key={post.id} mediaId={post.featured_media} title={post.title.rendered} />
                ))}
            </ul>
        )
    }
}

PostList.PropTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList
