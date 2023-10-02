import { useEffect, useRef } from 'react';

import { CreateJobDto } from '../types/jobs';

interface Props {
  jobData: CreateJobDto;
  setJobData: any;
  current: string;
}

const AddDocuments = ({ setJobData, current }: Props) => {
  return (
    <>
      <div
        className={`form-inputs ${
          current.toLowerCase() !== 'documents' && 'hide'
        }`}>
        <div className="form-wrapper">
          <label htmlFor="resume">Resume</label>
          <input
            id="resume"
            className="input"
            type="file"
            // value={jobData.resume?.name}
            onChange={(e) => {
              // Grabbing input file
              const files = (e.target as HTMLInputElement).files;

              if (files && files.length > 0) {
                const file = files[0];
                setJobData((prevState: any) => {
                  return { ...prevState, [e.target.id]: file };
                });
              }
            }}
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
            // value={jobData.cover?.name}
            onChange={(e) => {
              const files = (e.target as HTMLInputElement).files;

              if (files && files.length > 0) {
                const file = files[0];
                console.log(file);
                setJobData((prevState: any) => {
                  return { ...prevState, [e.target.id]: file };
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddDocuments;
