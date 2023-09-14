'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const posts = [
  {
    id: '1',
    title: 'Post 1',
  },
  {
    id: '2',
    title: 'Post 2',
  },
];

const onError = (message: string) => {
  toast.error(message, {
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
    theme: 'dark',
  });
};

const onLoading = (message: string) => {
  toast.info(message, {
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
    theme: 'dark',
  });
};

const onFetch = (message: string) => {
  toast.success(message, {
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
    theme: 'dark',
  });
};

const Page = () => {
  const queryClient = useQueryClient();

  // Query
  const postsQuery = useQuery({
    queryKey: ['jobs'], // Unique query key
    queryFn: () => wait(2500).then(() => posts), // Function that queries data
    // queryFn: () => wait(50).then(() => Promise.reject()), // Function that queries data
  });

  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      await wait(3000).then(() =>
        posts.push({
          id: crypto.randomUUID(),
          title,
        })
      );
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(); // Invalidates query which causes a react-query to fefetch data so as to not diplsy cached data.
    // },
  });

  if (postsQuery.isLoading) {
    onLoading('Fetching data');
    return <div>Loading posts.....</div>;
  }
  if (postsQuery.isError) {
    onError('Posts failed to load.');
    return <div>Error loading posts.</div>;
  }
  if (postsQuery.data && postsQuery.isSuccess) {
    onFetch('Data fetched successfully');
  }

  return (
    <div>
      {postsQuery.data &&
        postsQuery.data.map((post) => {
          return (
            <div key={post.id}>
              <div>{post.id}</div>
              <div>{post.title}</div>
            </div>
          );
        })}
      <button onClick={() => newPostMutation.mutate('The best new post')}>
        Add New
      </button>
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Page;
