'use client';

import { useRef, ChangeEvent, useState } from 'react';
// import styles from '../styles/login.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div id="login-form">
      <div className="form-wrapper">
        <form action={onSubmit}>
          <div className="input-wrapper">
            <input
              id="email-input"
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </div>
          <div className="input-wrapper">
            <input
              id="username-input"
              className="input"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => handleUsernameChange(e)}
            />
          </div>
          <div className="button-wrapper">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
