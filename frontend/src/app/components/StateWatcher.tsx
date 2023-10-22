'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'react-toastify';
import { setReset } from '@/features/global/globalSlice';

/**
 *A component that manages user notifications globally based off state
 *
 * @return {*}
 */
const StateWatcher = () => {
  const { isError, isSuccess, message } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success(message);
    }

    //Reset state to default
    dispatch(setReset());
  }, [isError, isSuccess, message, dispatch]);

  return <div className="StateWatcher"></div>;
};

export default StateWatcher;
