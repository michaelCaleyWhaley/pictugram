import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      username,
      password,
    });

    const config = {
      method: 'post',
      url: '/users/register',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then((response) => {
        localStorage.setItem('my_user_token', response.data.token);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          type="text"
        />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <br />
        <button type="submit">register</button>
        <a href="/" className="create-account">
          already have an account
        </a>
      </form>
    </div>
  );
}

export { SignUp };
