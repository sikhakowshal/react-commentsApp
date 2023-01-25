import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {
    commentDetails,
    backgroundColors,
    updateCommentsList,
    updateLikeStatus,
  } = props
  const {id, name, comment, isLiked} = commentDetails

  const likedStatusText = isLiked ? 'liked-text' : ''

  const onClickDeleteIcon = () => {
    updateCommentsList(id)
  }

  const onClickLikeImg = () => {
    updateLikeStatus(id)
  }

  const backgroundColorIndex = Math.floor(
    Math.random() * backgroundColors.length,
  )
  const backgroundColor = backgroundColors[backgroundColorIndex]

  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? 'Liked' : 'Like'

  return (
    <li className="comment-item">
      <div className="comment-details">
        <p className={`initial ${backgroundColor}`}>{name[0]}</p>
        <div className="name-container">
          <div className="name-time">
            <p className="full-name">{name}</p>
            <p className="time">{formatDistanceToNow(new Date())}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <img src={likeImg} className="like-img" alt="like" />
        <button className="like-button" type="button" onClick={onClickLikeImg}>
          <p className={`like-text ${likedStatusText}`}>{likeText}</p>
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteIcon}
          data-testId="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
