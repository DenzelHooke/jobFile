import React from 'react';

import { CreateJobDto } from '../types/jobs';

interface Props {
  jobData: CreateJobDto;
  setJobData: any;
}

const AddDocuments = ({ jobData, setJobData }: Props) => {
  return (
    <>
      <div className="form-inputs">
        <div className="form-wrapper">
          <label htmlFor="resume">Resume</label>
          <input
            id="resume"
            className="input"
            type="file"
            value={jobData.resume}
            onChange={(e) =>
              setJobData((prevState: CreateJobDto) => {
                return { ...prevState, [e.target.id]: e.target.value };
              })
            }
            placeholder="Add File"
          />
        </div>
        <div className="form-wrapper">
          <label htmlFor="cover">Cover Letter</label>
          <input
            id="cover"
            className="input"
            type="file"
            placeholder="Add File"
            value={jobData.cover}
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

export default AddDocuments;
