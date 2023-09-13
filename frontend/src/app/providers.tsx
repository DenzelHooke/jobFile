'use client';
import React from 'react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MyComponentProps {
  children: ReactNode;
}

const Providers = ({ children }: MyComponentProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default Providers;
