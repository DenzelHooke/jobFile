'use client';

import { useState, useEffect } from 'react';
import { BsBuildingsFill } from 'react-icons/bs';
import { TiSortAlphabetically } from 'react-icons/ti';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFilter } from '@/features/jobs/jobSlice';

const FilterJobs = () => {
  const { currentFilter } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {}, [currentFilter]);

  const options = [
    {
      data: 'Company',
      icon: <BsBuildingsFill size={20} />,
    },
    {
      data: 'Alphabet',
      icon: <TiSortAlphabetically size={20} />,
    },
    // {
    //   data: 'Position',
    //   icon: <BsBuildingsFill size={20} />,
    // },
  ];

  const onClick = (option: string) => {
    if (option) {
      dispatch(setCurrentFilter(option.toLowerCase()));
    }
  };

  return (
    <div className="dashboard__filter">
      FILTERS
      {options.map((item) => {
        return (
          <div
            className={`dashboard__filter__item ${
              item.data.toLowerCase() == currentFilter.toLowerCase()
                ? 'active'
                : 'inactive'
            }`}
            onClick={(e) => onClick(item.data.toLowerCase())}>
            {item.icon}
            {item.data}
          </div>
        );
      })}
    </div>
  );
};

export default FilterJobs;
