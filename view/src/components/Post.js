import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wp from '../utils/api'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            title: this.props.title,
            image: null
        }
    }

    componentDidMount() {
        wp.media().id(this.props.mediaId)
            .then(image => {
                const url = image.media_details.sizes.thumbnail.source_url
                this.setState({
                    image: url
                })
            })
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
        const image = this.state.image
        return (
            <li
                className="post-list__item"
                onClick={this.handleTitleClick}>
                {image
                    ? <img className="post-list__item__image" width="50" height="50" src={image} alt={title} />
                    : <a href="#" className="button" onClick={this.handleImageEdit}>Add Image</a>}
                {editing
                    ? <input
                        className="post-list__item__input"
                        type="text"
                        onChange={this.handleTitleEdit}
                        value={this.state.title} />
                    : <h4 className="post-list__item__title">{title}</h4>}
                {editing
                    ? <div className="post-list__item__save post-list__item__meta">
                        <a href="#" className="button button-primary" onClick={this.saveTitle}>Save Post</a>
                        <a href="#" className="button" onClick={this.cancelEdit}>Cancel</a>
                      </div>
                    : <div className="post-list__item__edit post-list__item__meta">
                        <a href="#" className="button button-primary" onClick={this.handleTitleEdit}>Edit Title</a>
                        <a href="#" className="button button-danger" onClick={this.deletePost}>Delete Post</a>
                      </div>}
            </li>
        )
    }
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    mediaId: PropTypes.number.isRequired
}

export default Post
