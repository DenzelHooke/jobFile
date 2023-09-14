'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const users = [
  {
    id: 1,
    username: 'Johnny Cash',
  },
  {
    id: 2,
    username: 'Elvis Presley',
  },
];

const posts = [
  {
    id: '1',
    title: 'Post 1',
    userId: 1,
  },
  {
    id: '2',
    title: 'Post 2',
    userId: 2,
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

// Unique key

// /jobs -> ["jobs"]
// /jobs/1 -> [jobs", post.id]
// jobs?user=1 -> ["jobs", { user:1 }]
// jobs/2/notes -> ["jobs", 2, "notes"]

const Page = () => {
  const queryClient = useQueryClient();

  // Query
  const postsQuery = useQuery({
    queryKey: ['jobs'], // Unique query key
    queryFn: () => wait(2500).then(() => posts), // Function that queries data
    // queryFn: () => wait(50).then(() => Promise.reject()), // Function that queries data
    staleTime: 5000, //Causes data to initially be stale once fetched, for 5 second before setting query to stale.`
    refetchInterval: 10000, //Causes data to refetch 10 seconds AFTER data is considered "fresh"`
  });

  const userQuery = useQuery({
    queryKey: ['users', postsQuery?.data?.userId],
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
    // Runs when is function resolves succesfully.
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidates query which causes a react-query to fefetch data so as to not diplsy cached data.
      onFetch('Data success');
    },
  });

  if (postsQuery.isLoading) {
    onLoading('Fetching data');
    return <div>Loading posts.....</div>;
  }
  if (postsQuery.isError) {
    onError('Posts failed to load.');
    return <div>Error loading posts.</div>;
  }
  // if (postsQuery.isSuccess) {
  //   onFetch('Data fetched successfully');
  // }

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
