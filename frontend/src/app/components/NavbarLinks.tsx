import React from 'react';
import Link from 'next/link';

const NavbarLinks = () => {
  return (
    <div className="navbar-links">
      <ul>
        <li>
          <Link href="login">Login</Link>
        </li>
        <li>
          <Link href="register">Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLinks;
