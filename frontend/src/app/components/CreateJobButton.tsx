'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal, setModalType } from '@/features/global/globalSlice';

const CreateJobButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setModal(true));
    dispatch(setModalType('addjob'));
  };
  return <div className="button-wrapper"><button onClick={onClick}>NEW</button></div>;
};
export default CreateJobButton;
