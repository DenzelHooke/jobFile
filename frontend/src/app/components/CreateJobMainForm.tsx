'use client';

import React from 'react';
import { CreateJobDto } from '../types/jobs';
interface Props {
  jobData: CreateJobDto;
  setJobData: any;
  jobMutation: any;
}

const CreateJobMainForm = ({ jobData, setJobData, jobMutation }: Props) => {
  return (
    <>
      <div className="form-inputs">
        <div className="form-wrapper">
          <label htmlFor="title">Position</label>
          <input
            id="title"
            className="input"
            type="text"
            value={jobData.title}
            onChange={(e) =>
              setJobData((prevState: CreateJobDto) => {
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
              setJobData((prevState: any) => {
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
              setJobData((prevState: any) => {
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
              setJobData((prevState: any) => {
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
              setJobData((prevState: any) => {
                return { ...prevState, [e.target.id]: e.target.value };
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default CreateJobMainForm;
