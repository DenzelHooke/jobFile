import React from 'react';
import EntryForm from '../components/EntryForm';
import RegisterDesign from '../components/RegisterDesign';
import RegisterForm from '../components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  keywords: ['sign up, register', 'create account', 'make account'],
  description: 'Create an account',
};

const Page = () => {
  return (
    <>
      <section className="section">
        <EntryForm
          designContainer={<RegisterDesign />}
          form={<RegisterForm />}
        />
      </section>
    </>
  );
};

export default Page;
