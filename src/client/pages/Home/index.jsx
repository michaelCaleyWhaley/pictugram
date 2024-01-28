import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './styles.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

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
  }, []);

  return <div>Home</div>;
}

export { Home };
