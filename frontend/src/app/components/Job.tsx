import React from 'react';
import { BiSolidPlusCircle } from 'react-icons/bi';
import { CreateJobDto } from '../types/jobs';

interface props {
  onItemClick: (itemData: any) => void;
  onItemDelete: (itemData: any) => void;
  item: CreateJobDto;
}

const Job = ({ onItemClick, onItemDelete, item }: props) => {
  return (
    <div className="job__item__wrapper">
      <div
        className="job_item"
        key={crypto.randomUUID()}
        onClick={(e) => onItemClick(item._id)}>
        <div className="job__item__title">{item.company}</div>
        <div className=" job__item__subtitle">{item.title}</div>
      </div>
      <BiSolidPlusCircle
        size={25}
        className="job__item__icon"
        onClick={() => onItemDelete(item._id)}
      />
    </div>
  );
};

export default Job;
