import React from 'react';
import Redirect from '../components/Redirect';
import '../styles/dashboard.scss';
import FilterJobs from '../components/FilterJobs';
import SearchJobs from '../components/SearchJobs';
import DisplayJobs from '../components/DisplayJobs';
import DashboardModal from '../components/Modal';

import CreateJobButton from '../components/CreateJobButton';
import CreateJobForm from '../components/CreateJobForm';

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
