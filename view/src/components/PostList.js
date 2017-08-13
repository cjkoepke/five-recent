import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

const PostList = (props) => {
    const posts = props.posts
    return (
        <ul className="post-list">
            {posts.map(post => (
                <Post
                    key={post.id}
                    data={post}
                    onDeletePost={props.onDeletePost} />
            ))}
        </ul>
    )
}

PostList.PropTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList
