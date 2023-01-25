import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], commentsCount: 0, name: '', comment: ''}

  submitComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      commentsCount: prevState.commentsCount + 1,
      name: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  updateCommentsList = id => {
    const {commentsList} = this.state
    const newCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentsList: newCommentsList,
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  updateLikeStatus = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentsList, commentsCount, name, comment} = this.state

    console.log(commentsList)

    return (
      <div className="container">
        <div className="content">
          <h1 className="heading">Comments</h1>
          <div className="top-section">
            <form className="form-control" onSubmit={this.submitComment}>
              <p className="instruction">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <textarea
                type="text"
                className="comment-input"
                placeholder="Your Comment"
                rows="8"
                onChange={this.onChangeComment}
                value={comment}
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <div className="comments-section">
            <div className="comments-indicator">
              <p className="comments-count">{commentsCount}</p>
              <p className="comment-count-indicator">Comments</p>
            </div>
            <ul className="comments-container">
              {commentsList.map(eachComment => (
                <CommentItem
                  commentDetails={eachComment}
                  backgroundColors={initialContainerBackgroundClassNames}
                  key={eachComment.id}
                  updateCommentsList={this.updateCommentsList}
                  updateLikeStatus={this.updateLikeStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
