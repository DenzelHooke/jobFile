'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@/app/types/auth';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { AxiosError } from 'axios';

// import styles from '../styles/login.module.scss';

const LoginForm = () => {
  //States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  //Queries/muations
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: User) => {
      return await axios.post('auth/login/', {
        email,
        password,
      });
    },
  });

  //Data Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevents submit auto-reload
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    //Send data to backend api
    loginMutation.mutate({
      email,
      password,
    });
  };

  if (loginMutation.isError) {
    const errorResponse = loginMutation.error as any;

    // Set error with error message from backend
    dispatch(setError(errorResponse.response?.data?.message));
  } else if (loginMutation.isSuccess) {
    // Set success with success message
    dispatch(setSuccess('Account created succesfully'));
  }

  return (
    <div id="login-form" className="auth-form">
      <div className="heading">
        <h2 className="heading-text">Login</h2>
        <small className="accent-text small-text">Welcome back!</small>
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
            {loginMutation.isLoading ? (
              <button type="submit" disabled className="button no-hover">
                Loading...
              </button>
            ) : (
              <button type="submit" className="button">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
      <p className="info-form">
        Don't have an account?
        <span>
          <Link href="/register">Sign up here!</Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
