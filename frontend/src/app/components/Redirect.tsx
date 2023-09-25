'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Redirect = () => {
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: () => {
      console.log('RUNNING AUTH QUERY');
      axios.get('/auth/authenticate/');
    },
  });

  useEffect(() => {
    if (authQuery.isError) {
      redirect('/login');
    }
  }, [authQuery.isError, redirect]);

  return <div></div>;
};

export default Redirect;
