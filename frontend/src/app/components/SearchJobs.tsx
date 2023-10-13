'use client';

import { useState, useEffect } from 'react';
import { FormEvent, ChangeEvent } from 'react';
import {BsSearch} from 'react-icons/bs'


const SearchJobs = () => {
  const [inputValue, setInputValue] = useState('');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="dashboard__search__container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input__wrapper">
          <BsSearch className="dashboard__seach__container__icon"/>
          <input
            type="text"
            id="job"
            placeholder="Search Applications"
            onChange={(e) => onChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchJobs;
