'use client';
import React from 'react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store';
interface MyComponentProps {
  children: ReactNode;
}

const Providers = ({ children }: MyComponentProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default Providers;
