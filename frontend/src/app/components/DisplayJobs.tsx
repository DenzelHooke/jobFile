'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateJobDto } from '../types/jobs';


import {
  setError,
  setModal,
  setModalType,
  setSuccess,
} from '@/features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setSelectedJob } from '@/features/jobs/jobSlice';
import Job from './Job';
import { RootState } from '../store';
import DisplaySearchedJobs from './DisplaySearchedJobs';

const getJobs = async () => {
  return await axios.get('/jobs/');
};

const DisplayJobs = () => {
  const dispatch = useDispatch();
  const { jobs, search_value } = useSelector((state: RootState) => state.jobs);

  const jobQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobs(),
    // onSuccess: (data) => console.log(data.data),
    // refetchInterval: 10000,
  });

  const onItemClick = (id: string | undefined) => {
    if (!id) {
      dispatch(setError('Job has no id key'));
      return;
    }
    dispatch(setModal(true));
    dispatch(setModalType('editjob'));
    dispatch(setSelectedJob(id));
  };

  useEffect(() => {
    if (jobQuery.data) {
      dispatch(setJobs(jobQuery.data.data));
    }
  }, [jobQuery.data]);

  if (jobQuery.isLoading) {
    return <div>Getting Jobs..</div>;
  }

  if (jobQuery.isError) {
    return <div>Jobs failed to load</div>;
  }

  return (
    <div className="dashboard__list__jobs">
      {
      search_value ? <DisplaySearchedJobs jobs={jobs} search_value={search_value} onClick={onItemClick}/> : jobs?.map((item: CreateJobDto) => {
        return <Job onItemClick={onItemClick} item={item} />;
      })
      }
    </div>
  );
};

export default DisplayJobs;
