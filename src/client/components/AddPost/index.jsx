/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

import { ShowContext } from '../../containers/ShowContext';

import './styles.css';

function AddPost() {
  const cardRef = useRef();

  const { add } = useContext(ShowContext);
  const [showAddPosts, toggleAddPost] = add;
  const [clickState, setClickState] = useState(false);
  const [picture, setPicture] = useState(null);
  const [caption, setCaption] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        toggleAddPost(!showAddPosts);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickState]);

  function getFile(file) {
    const exp = /\d+/;
    if (file.size.match(exp)[0] > 100) {
      setShowError(true);
    } else {
      setShowError(false);
      setPicture(file);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('my_user_token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userId = JSON.parse(atob(base64)).id;
    const data = JSON.stringify({
      caption,
      image: picture?.base64 || null,
    });

    const config = {
      method: 'post',
      url: `/posts/add/${userId}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('my_user_token')}`,
      },
      data,
    };

    axios(config)
      .then(() => {
        toggleAddPost(!showAddPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      onClick={() => setClickState(!clickState)}
      onKeyDown={() => {}}
      className="add-post-modal"
      role="button"
      tabIndex="0"
    >
      <div ref={cardRef} className="add-post-card">
        <div
          className="add-post-img add-post"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            background: picture ? `url(${picture.base64})` : null,
          }}
        >
          {showError && <p className="error">File must be less 100kb</p>}
          {!picture ? (
            // eslint-disable-next-line react/jsx-no-bind
            <FileBase64 onDone={getFile} />
          ) : (
            <span onClick={() => setPicture(null)} className="remove-button">
              x
            </span>
          )}
        </div>

        <div className="add-post-main">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <input
              onChange={(e) => setCaption(e.target.value)}
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

export { AddPost };
