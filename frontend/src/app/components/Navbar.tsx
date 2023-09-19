import React from 'react';
import Link from 'next/link';
import NavbarLinks from './NavbarLinks';
import Image from 'next/image';
import '@/app/styles/navbar.scss';

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="logo">
        <Image src="./logo-no-background.svg" alt="Logo" fill />
      </div>
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
