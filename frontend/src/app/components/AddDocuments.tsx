import { useEffect, useRef } from 'react';

import { CreateJobDto } from '../types/jobs';

interface Props {
  jobData: CreateJobDto;
  setJobData: any;
  current: string;
  fileUrlState?: any;
}

const AddDocuments = ({ setJobData, current, fileUrlState }: Props) => {
  return (
    <>
      <div className="input__form__wrapper">
        <div
          className={`form-inputs ${
            current.toLowerCase() !== 'documents' && 'hide'
          }`}>
          {fileUrlState && (
            <iframe
              src={`${fileUrlState.resumeUrl}`}
              width="400px"
              height="380px"></iframe>
          )}
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
        </div>
      </div>
    </>
  );
};

export default AddDocuments;
