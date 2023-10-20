'use client';
import React, {
  BaseSyntheticEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { useDispatch } from 'react-redux';
import { CreateJobDto } from '../types/jobs';
import CreateJobMainForm from './CreateJobMainForm';
import AddDocuments from './AddDocuments';
import { setRefetch } from '@/features/jobs/jobSlice';

const createFormData = (jobData: any) => {
  const formData = new FormData();
  for (const key in jobData) {
    // console.log(key);
    formData.append(key, jobData[key]);
  }

  return formData;
};

const CreateJobForm = () => {
  const dispatch = useDispatch();
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

  const jobMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await axios.post('/jobs/', data);
    },

    onSuccess: (context) => {
      // Sets refetch to true so we can display newly created job to user
      dispatch(setRefetch(true));
      console.log('Setting refetch to ', true);
      // Set success with success message
      dispatch(setSuccess('Job Created'));
    },
  });

  const [currentOption, setCurrentOption] = useState('info');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = createFormData(jobData);

    jobMutation.mutate(data);
  };

  useEffect(() => {
    if (jobMutation.isError) {
      const errorResponse = jobMutation.error as any;

      // Set error with error message from backend
      dispatch(setError(errorResponse.response?.data?.message));
    }
  }, [jobMutation.isError, setError, setSuccess]);

  return (
    <div className="form dashboard__form">
      <div className="job__heading heading">
        <h2 className="heading-text">Create New</h2>
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
          {/* {options[`${currentOption}`]} */}
          <CreateJobMainForm
            current={currentOption}
            jobData={jobData}
            setJobData={setJobData}
          />

          <AddDocuments
            jobData={jobData}
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
                Create Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
