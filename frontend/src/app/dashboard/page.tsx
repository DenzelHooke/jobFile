import React from 'react';
import Redirect from '../components/Redirect';
import { redirect } from 'next/navigation';
import axios from 'axios';
import '../styles/dashboard.scss';
import FilterJobs from '../components/FilterJobs';
import SearchJobs from '../components/SearchJobs';
import DisplayJobs from '../components/DisplayJobs';

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
      <section id="dashboard">
        <div className="dashboard__sidebar">
          <FilterJobs />
        </div>
        <div className="dashboard__content">
          <SearchJobs />
          <DisplayJobs />
        </div>
      </section>
    </>
  );
};

export default Page;
