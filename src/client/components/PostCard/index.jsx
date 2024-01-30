import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShowContext } from '../../containers/ShowContext';

import './styles.css';

function PostCard({ post }) {
  const { comments } = useContext(ShowContext);
  const [, toggleComments] = comments;

  const handleClick = () => {
    toggleComments({
      status: true,
      post,
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-body">
        <p className="username">User: {post.username} </p>
        {post?.image && (
          <img src={post.image} alt={post.caption} className="post-image" />
        )}
        <p className="post-caption">Caption: {post.caption}</p>
        {post.comments.length > 0 ? (
          <button onClick={handleClick} type="button" className="view-comments">
            View all comments
          </button>
        ) : (
          <button onClick={handleClick} type="button" className="view-comments">
            No comments yet
          </button>
        )}
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export { PostCard };
