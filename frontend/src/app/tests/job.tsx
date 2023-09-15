import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wait } from './page';

interface props {
  id: number;
}

interface job {
  id: number;
  title: string;
  userId: number;
}

interface user {
  id: number;
  username: string;
}

const users: user[] = [
  {
    id: 1,
    username: 'Johnny Cash',
  },
  {
    id: 2,
    username: 'Elvis Presley',
  },
];

const jobs: job[] = [
  {
    id: 1,
    title: 'Job 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Job 2',
    userId: 2,
  },
];

const getJob = (id: number) => {
  return jobs.find((job) => job.id === id);
};

const getUser = (id: number | undefined) => {
  return users.find((user) => user.id === id);
};

const Job = ({ id }: props) => {
  //Runs on mount
  const jobQuery = useQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id),
  });

  // Runs only when jobQuery.data.userId exists
  const userQuery = useQuery({
    queryKey: ['user', jobQuery.data?.userId],
    enabled: jobQuery.data?.userId != null,
    queryFn: async () => {
      if (jobQuery.data?.userId) {
        return await wait(1000).then(() => getUser(jobQuery.data?.userId));
      }
    },
  });

  return (
    <div>
      <small>
        {userQuery.isLoading
          ? 'Loading title'
          : userQuery.isError
          ? 'Error loading title'
          : userQuery.data?.username}
      </small>
      <br />
      {jobQuery.data?.title}
    </div>
  );
};

export default Job;
