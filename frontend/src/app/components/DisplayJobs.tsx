'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateJobDto } from '../types/jobs';
import { randomUUID } from 'crypto';
const getJobs = async () => {
  return await axios.get('/jobs/');
};

const DisplayJobs = () => {
  const jobQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobs(),
    onSuccess: (data) => console.log(data.data),
    refetchInterval: 10000,
  });

  const jobs: CreateJobDto[] = [
    {
      title: 'Sales Associate',
      company: 'Southridge Bldg',
    },
    {
      title: 'Software Engineer',
      company: 'Apple',
    },
    {
      title: 'Mechanic',
      company: 'Oaklahoma Autos',
    },
  ];

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
          <div className="job_item" key={crypto.randomUUID()}>
            <div className="job__item__title">{item.title}</div>
            <div className="job__item__subtitle">{item.company}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayJobs;
