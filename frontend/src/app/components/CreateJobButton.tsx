'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '@/features/global/globalSlice';

const CreateJobButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setModal(true));
  };
  return <button onClick={onClick}>NEW</button>;
};
export default CreateJobButton;
