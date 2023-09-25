import React from 'react';
import Redirect from '../components/Redirect';
// import { redirect } from 'next/navigation';

// const verifyUser = async () => {
//   const isAuth = await fetch('http://localhost:3000/auth/authenticate');

//   if (isAuth.ok) {
//     redirect('/login');
//   }
// };

const Page = () => {
  //   verifyUser();

  return (
    <>
      <Redirect />
      <div>Dashboard</div>
    </>
  );
};

export default Page;
