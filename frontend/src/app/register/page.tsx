import React from 'react';
import EntryForm from '../components/EntryForm';
import RegisterDesign from '../components/RegisterDesign';
import RegisterForm from '../components/RegisterForm';

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
