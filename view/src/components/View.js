import React, { Component } from 'react';
import PostList from './PostList'
import wp from '../utils/api'

class View extends Component {
    state = {
        loaded: false,
        posts: [],
        error: false
    }

    componentDidMount() {
        this.getPostList()
    }

    getPostList = () => {
        this.setState({loaded: false})
        wp.posts()
            .perPage(5)
            .then(posts => {
                this.setState((prevState) => ({
                    loaded: !prevState.loaded,
                    error: false,
                    posts
                }))
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                console.error(err)
            })
    }

    updatePostList = (id) => {
        // Can only delete one post at a time, so only fetch one.
        wp.posts()
            .perPage(1)
            .offset(4)
            .then(newPost => {
                this.setState((prevState) => {
                    // Remove deleted post from post list.
                    const posts = [...prevState.posts]
                        .filter(post => post.id !== id)
                        .concat(newPost)

                    return {posts};
                })
            })

    }

    deletePost = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'))
        wp.posts()
            .id(id)
            .delete()
            .then(res => {
                this.updatePostList(id)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="wrap five-recent">
                <h1 className="wp-heading-inline">{window.five_recent_api.page_title || 'Five Recent Editor'}</h1>
                {this.state.loaded
                    ? <PostList
                        posts={this.state.posts}
                        onDeletePost={this.deletePost}/>
                    : <p>Loading...</p>}
                {this.state.loaded && !this.state.posts.length &&
                    <h3>No posts!</h3>}
                {this.state.error &&
                    <p>Something went wrong. Check your console.</p>}
            </div>
        );
    }
}

export default View;
