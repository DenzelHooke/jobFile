'use client';
import React, { FormEvent } from 'react';

const CreateJobForm = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <div className="auth-form">
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
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="passwrd"
              className="input"
              type="password"
              placeholder="Password"
            />
          </div>
          {/* <div className="button-wrapper">
            {loginMutation.isLoading ? (
              <button type="submit" disabled className="button no-hover">
                Loading...
              </button>
            ) : (
              <button type="submit" className="button">
                Login
              </button>
            )}
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
