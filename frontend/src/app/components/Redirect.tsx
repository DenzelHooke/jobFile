'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Redirect = () => {
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      console.log('RUNNING AUTH QUERY');
      return await axios.get('/auth/authenticate/', {
        withCredentials: true,
      });
    },
    retry: false,
  });

  useEffect(() => {
    if (authQuery.isError) {
      redirect('/login');
    }
  }, [authQuery.isError, redirect]);

  return <div></div>;
};

export default Redirect;
