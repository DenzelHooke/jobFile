'use client';

import { isNotUser, resetAllGlobalState } from '@/features/global/globalSlice';
import { resetAllJobState } from '@/features/jobs/jobSlice';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const Router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await axios.get('/auth/logout/');
    },

    onSuccess: () => {
      // TODO Call all reset states
      dispatch(resetAllJobState());
      dispatch(resetAllGlobalState());
      dispatch(isNotUser());
      Router.push('/login');
    },
  });

  const onLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Link href="#" onClick={() => onLogout()}>
      Logout
    </Link>
  );
};

export default LogoutButton;
