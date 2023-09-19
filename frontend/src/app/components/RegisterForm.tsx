'use client';
import { useRef, ChangeEvent, FormEvent, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { NewUser } from '@/app/types/auth';
import Link from 'next/link';
import { resolve } from 'path';
import { toast } from 'react-toastify';
// import styles from '../styles/login.module.scss';

const wait = () => {
  //ms
  const wait_time = 100000000;

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), wait_time);
  });
};

const RegisterForm = () => {
  //States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Queries/muations
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: NewUser) => {
      return axios.post('auth/register/', {
        username,
        email,
        password,
      });

      return await wait().then(() => true);
    },
  });

  //Data Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !username || !password) {
      return;
    }

    registerMutation.mutate({
      email,
      username,
      password,
    });
    // Prevents submit auto-reload
    console.log('SUBMIT!');
  };

  if (registerMutation.isError) {
    toast.error(registerMutation.data?.message);
  } else if (registerMutation.isSuccess) {
    toast.success('Account successfully created');
  }

  return (
    <div id="register-form" className="auth-form">
      <div className="heading">
        <h2 className="heading-text">Create an Account</h2>
        <small className="accent-text small-text">
          It only takes a second!
        </small>
      </div>
      <div className="inner-auth-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleUsernameChange(e)}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="passwrd"
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
          <div className="button-wrapper">
            {registerMutation.isLoading ? (
              <button type="submit" disabled className="button no-hover">
                Loading...
              </button>
            ) : (
              <button type="submit" className="button">
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
      <p className="info-form">
        Already have an account?
        <span>
          <Link href="/login">Login here!</Link>
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
