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
        this.updatePostList()
            .then(posts => {
                this.setState((prevState) => ({
                    loaded: !prevState.loaded,
                    posts
                }))
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                throw new Error(err)
            })
    }

    updatePostList = () => {
        this.setState({loaded: false})
        return wp.posts()
                .perPage(5)
                .get()
    }

    render() {

        return (
            <div className="wrap five-recent">
                <h1 className="wp-heading-inline">{window.five_recent_api.page_title || 'Five Recent Editor'}</h1>
                {this.state.loaded
                    ? <PostList posts={this.state.posts} />
                    : <p>Loading...</p>}
                {this.state.error &&
                    <p>Something went wrong. Check your console.</p>}
            </div>
        );
    }
}

export default View;
