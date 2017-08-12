import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wp from '../utils/api'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            title: this.props.title
        }
    }

    handleTitleClick = () => {
        if (this.state.editing) {
            return;
        }
        this.setState((prevState) => ({editing: !prevState.editing}))
    }

    handleTitleEdit = (e) => {
        const title = e.target.value
        this.setState(() => ({title}))
    }

    cancelEdit = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            editing: !prevState.editing,
            title: this.props.title
        }))
    }

    render() {
        const title = this.state.title
        const editing = this.state.editing
        return (
            <li
                className="post-list__item"
                onClick={this.handleTitleClick}>
                {editing
                    ? <input
                        type="text"
                        onChange={this.handleTitleEdit}
                        value={this.state.title} />
                    : title}
                {editing
                    ? <span className="post-list__item__save">
                        <a href="#" onClick={this.saveTitle}>Save Post</a>
                        <a href="#" onClick={this.cancelEdit}>Cancel</a>
                      </span>
                    : <span className="post-list__item__edit">Edit Post</span>}
            </li>
        )
    }
}

Post.propTypes = {
    title: PropTypes.string.isRequired
}

export default Post
