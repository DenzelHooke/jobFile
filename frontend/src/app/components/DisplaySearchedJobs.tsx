'use client';

import { useState, useEffect } from 'react';
import { CreateJobDto } from '../types/jobs';
import Job from './Job';
import { v4 as uuid } from 'uuid';

interface props {
  jobs: CreateJobDto[];
  search_value: string;
  onClick: (itemData: any) => void;
  onDelete: (id: string) => void;
}

const filterJobs = (
  jobs: CreateJobDto[],
  search_value: props['search_value']
) => {
  return jobs.filter((item: CreateJobDto) =>
    item.company.toLowerCase().includes(search_value.toLowerCase())
  );
};

const DisplaySearchedJobs = ({
  jobs,
  search_value,
  onClick,
  onDelete,
}: props) => {
  const [filteredJobs, setFilteredJobs] = useState<CreateJobDto[]>([]);

  useEffect(() => {
    const filtered = filterJobs(jobs, search_value);
    setFilteredJobs(filtered);
  }, [search_value, jobs]);

  return (
    <div className="dashboard__list__jobs">
      {filteredJobs &&
        filteredJobs.map((item) => (
          <Job
            onItemClick={onClick}
            onItemDelete={onDelete}
            item={item}
            key={uuid()}
          />
        ))}
    </div>
  );
};

export default DisplaySearchedJobs;
