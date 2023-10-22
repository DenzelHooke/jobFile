'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isNotUser, isUser } from '@/features/global/globalSlice';

const Redirect = () => {
  const dispatch = useDispatch();

  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      return await axios.get('/auth/authenticate/', {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      dispatch(isUser());
    },
    retry: false,
  });

  useEffect(() => {
    if (authQuery.isError) {
      dispatch(isNotUser());
      redirect('/login');
    }
  }, [authQuery.isError, dispatch]);

  return <div></div>;
};

export default Redirect;
