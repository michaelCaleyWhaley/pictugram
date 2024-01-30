/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../../components/PostCard';
import { ShowContext } from '../../containers/ShowContext';
import { Comments } from '../../components/Comments';
import { AddPost } from '../../components/AddPost';

import './styles.css';

function Home() {
  const navigate = useNavigate();
  const [showComments, toggleComments] = useState(false);
  const [showAddPosts, toggleAddPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userName, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('my_user_token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    setUsername(JSON.parse(atob(base64)).username);
    const config = {
      method: 'get',
      url: '/posts',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('my_user_token')}`,
      },
    };

    axios(config)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        navigate('/');
        console.log(error);
      });
  }, [showAddPosts]);

  const handleLogout = () => {
    localStorage.removeItem('my_user_token');
    navigate('/');
  };

  return (
    <ShowContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        comments: [showComments, toggleComments],
        add: [showAddPosts, toggleAddPost],
      }}
    >
      <div>
        {showComments.status ? <Comments /> : null}
        {showAddPosts ? <AddPost /> : null}
        <div className="header">
          <button
            type="button"
            onClick={() => toggleAddPost(true)}
            className="new-post-btn"
          >
            new post
          </button>
        </div>
        <div className="wrapper">
          <div className="left-side">
            {posts.map((ele, i) => {
              const key = `${i}-postcard`;
              return <PostCard post={ele} key={key} />;
            })}
          </div>
          <div className="right-side">
            <div className="user-profile-wrapper">
              <div className="user-profile">{userName}</div>
              <span onClick={handleLogout} className="logout">
                logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </ShowContext.Provider>
  );
}

export { Home };
