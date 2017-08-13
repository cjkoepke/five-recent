import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wp from '../utils/api'
import placeholder from '../placeholder.jpg'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            title: this.props.data.title.rendered,
            image: null
        }
    }

    componentDidMount() {

        // If no featured image, don't fetch.
        if (this.props.data.featured_media === 0) {
            return;
        }

        wp.media()
            .id(this.props.data.featured_media)
            .then(image => {
                const url = image.media_details.sizes.thumbnail.source_url
                this.setState({
                    image: url
                })
            })
    }

    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState({title})
    }

    handleTitleSave = () => {
        wp.posts()
            .id(this.props.data.id)
            .update({
                title: this.state.title
            })
            .then(res => this.setState({editing: false}))
    }

    cancelEdit = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            editing: !prevState.editing,
            title: this.props.data.title.rendered
        }))
    }

    render() {
        const title = this.state.title
        const editing = this.state.editing
        const image = this.state.image || placeholder
        return (
            <li tabIndex="1" className="post-list__item">
                <div className="post-list__item__image">
                    {image &&
                        <img width="50" height="50" src={image} alt={title} />}
                </div>
                {editing
                    ? <input
                        className="post-list__item__input"
                        type="text"
                        onChange={this.handleTitleChange}
                        value={title} />
                    : <h4 className="post-list__item__title">{title}</h4>}
                {editing
                    ? <div className="post-list__item__save post-list__item__meta">
                        <a href="#" className="button button-primary" onClick={this.handleTitleSave}>Save Title</a>
                        <a href="#" className="button" onClick={this.cancelEdit}>Cancel</a>
                      </div>
                    : <div className="post-list__item__edit post-list__item__meta">
                        <button className="button button-primary" onClick={() => { this.setState({editing: true})}}>Change Title</button>
                        <button className="button button-primary" onClick={this.handleImageEdit}>
                            <span className="dashicons dashicons-format-image"></span>
                            <span className="screen-reader-text">Edit Featured Image</span>
                        </button>
                        <button data-id={this.props.data.id} className="button" onClick={this.props.onDeletePost}>Delete Post</button>
                      </div>}
            </li>
        )
    }
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export default Post
