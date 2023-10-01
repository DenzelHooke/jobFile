import React from 'react';

interface Job {
  id?: string;
  title: string;
  company: string;
  notes?: string;
  url?: string;
  location?: string;
  color?: string;
  salary?: number;
  resume?: string;
  cover?: string;
}

const DisplayJobs = () => {
  const jobs: Job[] = [
    {
      title: 'Sales Associate',
      company: 'Southridge Bldg',
    },
    {
      title: 'Software Engineer',
      company: 'Apple',
    },
    {
      title: 'Mechanic',
      company: 'Oaklahoma Autos',
    },
  ];

  return (
    <div id="dashboard__list__jobs">
      {jobs.map((item) => {
        return (
          <div className="job_item">
            <div className="job__item__title">{item.title}</div>
            <div className="job__item__subtitle">{item.company}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayJobs;
