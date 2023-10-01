import React from 'react';
import Redirect from '../components/Redirect';
import '../styles/dashboard.scss';
import FilterJobs from '../components/FilterJobs';
import SearchJobs from '../components/SearchJobs';
import DisplayJobs from '../components/DisplayJobs';
import DashboardModal from '../components/Modal';

import CreateJobButton from '../components/CreateJob';
import CreateJobForm from '../components/CreateJobForm';
// const verifyUser = async () => {
//   try {
//     const isAuth = await axios.get(
//       `${process.env.DEV_SERVER}/auth/authenticate`,
//       {
//         withCredentials: true,
//       }
//     );
//     console.log(isAuth.data);
//     //   return isAuth;
//     if (isAuth.status === 200) return true;
//     else {
//       return false;
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

const Page = async () => {
  //   const valid = await verifyUser();

  //   if (!valid) redirect('/login');

  return (
    <>
      <Redirect />
      <DashboardModal children={<CreateJobForm />} />
      <section id="dashboard">
        <div className="dashboard__sidebar">
          <FilterJobs />
        </div>
        <div className="dashboard__content">
          <div className="dashboard__content__header">
            <span className="dashboard__heading bold-text">Jobs</span>
            <span className="bgBlue round-pill dashboard__status">
              Displaying All
            </span>
          </div>
          <div className="dashboard__data">
            <div className="dashboard__data__header">
              <SearchJobs />
              <CreateJobButton />
            </div>
            <DisplayJobs />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
