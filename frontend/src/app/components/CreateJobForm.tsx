'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setError, setSuccess } from '@/features/global/globalSlice';
import { useDispatch } from 'react-redux';
import { CreateJobDto } from '../types/jobs';
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
    <div className="create-job-form form">
      <div className="heading">
        <h2 className="heading-text">Create new job</h2>
        <small className="accent-text small-text">Add a job!</small>
      </div>
      <div className="inner-auth-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-inputs">
            <div className="form-wrapper">
              <label htmlFor="title">Position</label>
              <input
                id="title"
                className="input"
                type="text"
                value={jobData.title}
                onChange={(e) =>
                  setJobData((prevState) => {
                    console.log(e.target.value);
                    return { ...prevState, [e.target.id]: e.target.value };
                  })
                }
                placeholder="Enter title"
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                className="input"
                type="text"
                placeholder="Eg. Apple"
                value={jobData.company}
                onChange={(e) =>
                  setJobData((prevState) => {
                    console.log(e.target.value);
                    return { ...prevState, [e.target.id]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="url">Page URL</label>
              <input
                id="url"
                className="input"
                type="text"
                placeholder="indeed.com/job/123"
                value={jobData.url}
                onChange={(e) =>
                  setJobData((prevState) => {
                    console.log(e.target.value);
                    return { ...prevState, [e.target.id]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="salary">Salary</label>
              <input
                id="salary"
                className="input"
                type="number"
                placeholder="$37,000"
                value={jobData.salary}
                onChange={(e) =>
                  setJobData((prevState) => {
                    console.log(e.target.value);
                    return { ...prevState, [e.target.id]: e.target.value };
                  })
                }
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                className="input"
                type="text"
                placeholder="1455 Quebec St, Vancouver"
                value={jobData.location}
                onChange={(e) =>
                  setJobData((prevState) => {
                    console.log(e.target.value);
                    return { ...prevState, [e.target.id]: e.target.value };
                  })
                }
              />
            </div>
          </div>
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
