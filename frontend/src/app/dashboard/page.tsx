import React from 'react';
import Redirect from '../components/Redirect';
import { redirect } from 'next/navigation';
import axios from 'axios';
const verifyUser = async () => {
  try {
    const isAuth = await axios.get(
      `${process.env.DEV_SERVER}/auth/authenticate`,
      {
        withCredentials: true,
      }
    );
    console.log(isAuth.data);
    //   return isAuth;
    if (isAuth.status === 200) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Page = async () => {
  //   const valid = await verifyUser();

  //   if (!valid) redirect('/login');

  return (
    <>
      <Redirect />
      <div>Dashboard</div>
    </>
  );
};

export default Page;
