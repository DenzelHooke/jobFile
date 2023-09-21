'use client';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@/app/types/auth';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { AxiosError } from 'axios';

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
  const dispatch = useDispatch();

  //Queries/muations
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: User) => {
      return await axios.post('auth/register/', {
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
    // Prevents submit auto-reload
    e.preventDefault();
    if (!email || !username || !password) {
      return;
    }

    //Send data to backend api
    registerMutation.mutate({
      email,
      username,
      password,
    });
  };

  useEffect(() => {
    if (registerMutation.isError) {
      const errorResponse = registerMutation.error as any;

      // Set error with error message from backend
      dispatch(setError(errorResponse.response?.data?.message));
    } else if (registerMutation.isSuccess) {
      // Set success with success message
      dispatch(setSuccess('Account created succesfully'));
    }
  }, [registerMutation.isError, setError, setSuccess]);

  return (
    <div id="register-form" className="auth-form max-80">
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
