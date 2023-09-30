import React from 'react';

const FilterJobs = () => {
  const options = [
    {
      data: 'Newest',
      link: '/dashboard',
    },
    {
      data: 'A-Z',
      link: '/dashboard',
    },
  ];

  return (
    <div className="dashboard__filter">
      {options.map((item) => {
        return <div className="dashboard__filter__item">{item.data}</div>;
      })}
    </div>
  );
};

export default FilterJobs;
