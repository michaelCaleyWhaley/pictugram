import axios from 'axios';
import React, { useContext, useRef, useEffect, useState } from 'react';

import { ShowContext } from '../../containers/ShowContext';
// import UserComment from './UserComment';

import './styles.css';

function Comments() {
  const { comments } = useContext(ShowContext);
  const [showComments, toggleComments] = comments;
  const [clickState, setClickState] = useState(false);
  const [content, setContent] = useState('');
  const cardRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        toggleComments({
          status: false,
          post: null,
        });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickState, toggleComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    const postId = showComments?.post?._id;
    const token = localStorage.getItem('my_user_token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userId = JSON.parse(atob(base64)).id;

    const data = JSON.stringify({
      content,
    });
    const config = {
      method: 'post',
      url: `/posts/add-comment/${postId}/${userId}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('my_user_token')}`,
      },
      data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      onClick={() => setClickState(!clickState)}
      onKeyDown={() => {}}
      className="comments-modal"
      role="button"
      tabIndex="0"
    >
      <div ref={cardRef} className="comment-card">
        <div
          className="comment-img"
          style={{
            background: `url(${showComments?.post?.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />

        <div className="comments-main">
          <div className="post-card-header">{showComments?.post?.username}</div>
          {showComments?.post?.comments.map((commentId, i) => {
            // return <UserComment key={i} item={commentId} />;

            // create component that fetches comments
            console.log('commentId: ', commentId);
            const key = `comments-${i}`;
            return <p key={key}>comment: {commentId}</p>;
          })}
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <input
              onChange={(e) => setContent(e.target.value)}
              placeholder="say something..."
              className="form-input"
              type="text"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export { Comments };
