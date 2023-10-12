'use client';
import React, {
  BaseSyntheticEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { useDispatch } from 'react-redux';
import { CreateJobDto } from '../types/jobs';
import CreateJobMainForm from './CreateJobMainForm';
import AddDocuments from './AddDocuments';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const createFormData = (jobData: any) => {
  const formData = new FormData();
  for (const key in jobData) {
    formData.append(key, jobData[key]);
  }
  console.log(formData);

  return formData;
};

const getJob = async (id: string | null) => {
  if (!id) {
    return false;
  }

  return await axios.get(`/jobs/${id}`);
};

interface Props {
  id: string | null;
}

const EditJob = ({ id }: Props) => {
  const [currentOption, setCurrentOption] = useState('info');
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    notes: '',
    url: '',
    location: '',
    color: '',
    salary: 0,
    resume: null,
    cover: null,
  });
  const [fileUrlState, setFileUrlState] = useState({
    resumeUrl: '',
  });
  const { selectedJob } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  const { data, refetch } = useQuery({
    queryKey: ['jobs', selectedJob],
    queryFn: async () => {
      const job = await getJob(selectedJob);

      return job;
    },
    refetchOnWindowFocus: false,
  });

  const jobMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!selectedJob) {
        throw new Error('No job id');
      }

      return await axios.put(`/jobs/${selectedJob}`, data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = createFormData(jobData);

    jobMutation.mutate(data);
  };

  useEffect(() => {
    if (jobMutation.isError) {
      const errorResponse = jobMutation.error as any;

      // Set error with error message from backend
      dispatch(setError(errorResponse.response?.data?.message));
    } else if (jobMutation.isSuccess) {
      // Set success with success message
      dispatch(setSuccess('Job Created'));
    }
  }, [jobMutation.isError, jobMutation.isSuccess, setError, setSuccess]);

  useEffect(() => {
    // const keys = {
    //   title: 1,
    //   company: 1,
    //   notes: 1,
    //   url: 1,
    //   location: 1,
    //   salary: 1,
    // };
    if (data) {
      console.log('GETTING FRESH DATA');
      setJobData(data.data);

      setFileUrlState({
        resumeUrl: data.data.resumeUrl ? data.data.resumeUrl : '',
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(jobData);
  }, [jobData]);

  return (
    <div className="form dashboard__form">
      <div className="job__heading heading">
        <h2 className="heading-text"></h2>
        <small className="accent-text small-text">Add a job!</small>
        <div className="form__options">
          <div
            className={`form__option ${currentOption === 'info' && 'selected'}`}
            onClick={() => setCurrentOption('info')}>
            Job Info
          </div>
          <div
            className={`form__option ${
              currentOption === 'documents' && 'selected'
            }`}
            onClick={() => setCurrentOption('documents')}>
            Documents
          </div>
        </div>
      </div>
      <div className="inner-form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <CreateJobMainForm
            current={currentOption}
            jobData={jobData}
            setJobData={setJobData}
          />
          <AddDocuments
            jobData={jobData}
            fileUrlState={fileUrlState}
            setJobData={setJobData}
            current={currentOption}
          />
          <div className="button-wrapper">
            {jobMutation.isLoading ? (
              <button type="submit" disabled className="button no-hover">
                Loading...
              </button>
            ) : (
              <button type="submit" className="button">
                Update Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
