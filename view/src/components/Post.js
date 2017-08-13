import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wp from '../utils/api'
import filePicker from 'component-file-picker'
import placeholder from '../placeholder.jpg'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            title: this.props.data.title.rendered,
            image: placeholder,
            imageUploading: true
        }
    }

    /**
     * If no featured image, don't fetch and use placeholder.
     * Otherwise, fetch the featured image and update.
     */
    componentDidMount() {
        if (this.props.data.featured_media === 0) {
            this.setState(prevState => ({imageUploading: !prevState.imageUploading}))
            return;
        }

        wp.media()
            .id(this.props.data.featured_media)
            .then(image => {
                this.setState((prevState) => ({
                    image: image.media_details.sizes.thumbnail.source_url,
                    imageUploading: !prevState.imageUploading
                }))
            })
    }

    /**
     * Handler to update the title change when editing.
     */
    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState({title})
    }

    /**
     * Handler to persist title update to the server,
     * and return state to non-editing mode.
     */
    handleTitleSave = () => {
        wp.posts()
            .id(this.props.data.id)
            .update({
                title: this.state.title
            })
            .then(res => this.setState({editing: false}))
    }

    /**
     * Handler to open file picker, send first image
     * selected to the server, then updated post with that image.
     * This could and should be broken up into separate functions,
     * but there's only so much you can refactor in a weekend. ;-)
     */
    handleImageUpload = () => {
        filePicker({
            accept: ['.jpg', '.jpeg', '.png', '.gif']
        }, files => {
            wp.media()
                .file( files[0] )
                .create()
                .then(image => {
                    this.setState((prevState) => ({
                        image: image.media_details.sizes.thumbnail.source_url,
                        imageUploading: !prevState.imageUploading
                    }))
                    return wp.posts().id(this.props.data.id).update({
                        featured_media: image.id
                    })
                })
                .then(post => {
                    this.setState((prevState) => ({
                        imageUploading: !prevState.imageUploading
                    }))
                })
                .catch(err => console.log(err))
        })
    }

    /**
     * Handler to cancel the editing state of the title,
     * and restore it to the original version.
     */
    cancelTitleEdit = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            editing: !prevState.editing,
            title: this.props.data.title.rendered
        }))
    }

    render() {
        const title = this.state.title
        const editing = this.state.editing
        const image = this.state.image
        const imageUploading = this.state.imageUploading
        return (
            <li tabIndex="1" className="post-list__item">
                <div className="post-list__item__image">
                    {!imageUploading &&
                        <img width="50" height="50" src={image} alt={title} />}
                    {imageUploading &&
                        <span className="dashicons dashicons-image-filter"></span>}
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
                        <a href="#" className="button" onClick={this.cancelTitleEdit}>Cancel</a>
                      </div>
                    : <div className="post-list__item__edit post-list__item__meta">
                        <button className="button button-primary" onClick={() => { this.setState({editing: true})}}>Change Title</button>
                        <button className="button button-primary" onClick={this.handleImageUpload}>
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
    data: PropTypes.object.isRequired,
    onDeletePost: PropTypes.func.isRequired
}

export default Post
