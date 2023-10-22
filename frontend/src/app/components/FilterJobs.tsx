'use client';

import { useState, useEffect } from 'react';
import { BsBuildingsFill } from 'react-icons/bs';
import { TiSortAlphabetically } from 'react-icons/ti';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentFilter,
  sortCompanyFilter,
  sortPosFilter,
} from '@/features/jobs/jobSlice';
import { v4 as uuid } from 'uuid';

const FilterJobs = () => {
  const { currentFilter } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {}, [currentFilter]);

  const options = [
    {
      data: 'Company',
      icon: <BsBuildingsFill size={20} />,
      onClick: sortCompanyFilter,
    },
    {
      data: 'Alphabet',
      icon: <TiSortAlphabetically size={20} />,
      onClick: sortPosFilter,
    },
  ];

  const onClick = (option: string, item: any) => {
    if (option) {
      dispatch(setCurrentFilter(option.toLowerCase()));
      dispatch(item.onClick());
    }
  };

  return (
    <div className="dashboard__filter">
      FILTERS
      {options.map((item) => {
        return (
          <div
            key={uuid()}
            className={`dashboard__filter__item ${
              item.data.toLowerCase() == currentFilter.toLowerCase()
                ? 'active'
                : 'inactive'
            }`}
            onClick={(e) => onClick(item.data.toLowerCase(), item)}>
            {item.icon}
            {item.data}
          </div>
        );
      })}
    </div>
  );
};

export default FilterJobs;
