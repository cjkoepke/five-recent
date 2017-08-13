import React, { Component } from 'react';
import PostList from './PostList'
import wp from '../utils/api'

class View extends Component {
    state = {
        loaded: false,
        posts: [],
        error: false
    }

    /**
     * Get the initial post query results on mount.
     */
    componentDidMount() {
        this.getPostList()
    }

    /**
     * Get the post list (max 5) and update the state.
     */
    getPostList = () => {
        wp.posts()
            .perPage(5)
            .then(posts => {
                this.setState({
                    loaded: true,
                    error: false,
                    posts
                })
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                console.error(err)
            })
    }

    /**
     * User can only delete one post at a time, so let's conserve
     * resources here and only fetch one from the DB.
     */
    updatePostList = (id) => {
        wp.posts()
            .perPage(1)
            .offset(4)
            .then(newPost => {
                this.setState((prevState) => {

                    /**
                     * Remove the deleted post from our post array
                     * and push the new post to the end (since it's newest).
                     */
                    const posts = [...prevState.posts]
                        .filter(post => post.id !== id)
                        .concat(newPost)

                    return {posts};

                })
            })

    }

    /**
     * Callback function to persist removal of the post
     * to the server's database. Update the post list once
     * this is complete.
     */
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

export default View
