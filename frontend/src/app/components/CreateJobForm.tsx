'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { useDispatch } from 'react-redux';
import { CreateJobDto } from '../types/jobs';
import CreateJobMainForm from './CreateJobMainForm';
import AddDocuments from './AddDocuments';

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
    resume: '',
    cover: '',
  });
  const jobMutation = useMutation({
    mutationFn: async (data: CreateJobDto) => {
      return await axios.post('/jobs/', data);
    },
  });

  //Record tells the compiler thgat each key is a string and has a value of a JSX Element
  const options: Record<string, JSX.Element> = {
    info: (
      <CreateJobMainForm
        jobData={jobData}
        jobMutation={jobMutation}
        setJobData={setJobData}
      />
    ),
    documents: <AddDocuments jobData={jobData} setJobData={setJobData} />,
  };

  const [currentOption, setCurrentOption] = useState('info');

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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    jobMutation.mutate(jobData);
  };

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
          {options[`${currentOption}`]}
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
