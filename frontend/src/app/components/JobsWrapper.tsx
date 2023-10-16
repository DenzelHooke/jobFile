'use client';

import { useEffect, useState } from 'react';
import DisplayJobs from './DisplayJobs';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DisplaySearchedJobs from './DisplaySearchedJobs';

const JobsWrapper = () => {
  const { search_value, jobs } = useSelector((state: RootState) => state.jobs);

  if (!search_value) {
    return <DisplayJobs />;
  }

  return <DisplaySearchedJobs jobs={jobs} search_value={search_value} />;
};

export default JobsWrapper;
