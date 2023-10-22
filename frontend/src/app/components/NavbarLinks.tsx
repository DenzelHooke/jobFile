'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LogoutButton from './LogoutButton';

const NavbarLinks = () => {
  const { isUser } = useSelector((state: RootState) => state.global);

  return (
    <div className="navbar-links">
      <ul>
        {!isUser ? (
          <>
            <li>
              <Link href="login">Login</Link>
            </li>
            <li>
              <Link href="register">Sign up</Link>
            </li>
          </>
        ) : (
          <LogoutButton />
        )}
      </ul>
    </div>
  );
};

export default NavbarLinks;
