'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateJobDto } from '../types/jobs';
import {
  setError,
  setModal,
  setModalType,
  setSuccess,
} from '@/features/global/globalSlice';
import { useDispatch } from 'react-redux';
import { setSelectedJob } from '@/features/jobs/jobSlice';

const getJobs = async () => {
  return await axios.get('/jobs/');
};

const DisplayJobs = () => {
  const dispatch = useDispatch();

  const jobQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobs(),
    // onSuccess: (data) => console.log(data.data),
    refetchInterval: 10000,
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

  if (jobQuery.isLoading) {
    return <div>Getting Jobs..</div>;
  }

  if (jobQuery.isError) {
    return <div>Jobs failed to load</div>;
  }

  return (
    <div id="dashboard__list__jobs">
      {jobQuery.data.data?.map((item: CreateJobDto) => {
        return (
          <div
            className="job_item"
            key={crypto.randomUUID()}
            onClick={(e) => onItemClick(item._id)}>
            <div className="job__item__title">{item.title}</div>
            <div className="job__item__subtitle">{item.company}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayJobs;
