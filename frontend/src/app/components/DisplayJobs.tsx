'use client';

import { useEffect } from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateJobDto } from '../types/jobs';

import {
  setError,
  setModal,
  setModalType,
  setSuccess,
} from '@/features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setRefetch, setSelectedJob } from '@/features/jobs/jobSlice';
import Job from './Job';
import { RootState } from '../store';
import DisplaySearchedJobs from './DisplaySearchedJobs';
import { v4 as uuid } from 'uuid';

const getJobs = async () => {
  return await axios.get('/jobs/');
};

const DisplayJobs = () => {
  const dispatch = useDispatch();
  const { jobs, search_value, canRefetch } = useSelector(
    (state: RootState) => state.jobs
  );

  const queryClient = new QueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobs(),
    // onSuccess: (data) => console.log(data.data),
    // refetchInterval: 10000,
  });

  const deleteJobQuery = useMutation({
    mutationFn: async (id: string) => {
      axios.delete(`/jobs/${id}`);
    },

    onSuccess: () => {
      dispatch(setRefetch(true));
    },
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

  const onItemDelete = async (id: string) => {
    deleteJobQuery.mutate(id);
  };

  useEffect(() => {
    if (canRefetch) {
      // Set canRefetch to false as data is now refetched
      dispatch(setRefetch(false));
      // Refetch current job data
      refetch();
    }

    if (data) {
      dispatch(setJobs(data.data));
    }

    return () => {
      console.log('Clearing cache...');
      queryClient.clear();
    };
  }, [data, canRefetch, dispatch, refetch]);

  if (isLoading) {
    return <div>Getting Jobs..</div>;
  }

  if (isError) {
    return <div>Jobs failed to load</div>;
  }

  return (
    <div className="dashboard__list__jobs">
      {search_value ? (
        <DisplaySearchedJobs
          jobs={jobs}
          search_value={search_value}
          onClick={onItemClick}
          onDelete={onItemDelete}
        />
      ) : (
        jobs?.map((item: CreateJobDto) => {
          return (
            <Job
              onItemClick={onItemClick}
              onItemDelete={onItemDelete}
              item={item}
              key={uuid()}
            />
          );
        })
      )}
    </div>
  );
};

export default DisplayJobs;
