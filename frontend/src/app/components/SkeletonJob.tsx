import React from 'react';

const SkeletonJob = () => {
  return (
    <div className="job__item__wrapper skeleton-job-wrapper">
      <div className="job_item" key={crypto.randomUUID()}>
        <div className="job__item__title skeleton-job-title">
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className=" job__item__subtitle skeleton-job-subtitle">
          <div className="skeleton skeleton-text-small skeleton-text"></div>
        </div>
      </div>
      {/* <BiSolidPlusCircle
        size={25}
        className="job__item__icon skeleton-job-subtitle"
      /> */}
    </div>
  );
};

export default SkeletonJob;
