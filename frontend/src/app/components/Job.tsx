import React from 'react'
import { BiSolidPlusCircle } from 'react-icons/bi'
import { CreateJobDto } from '../types/jobs'

interface props {
    onItemClick: (itemData: any) => void,
    item: CreateJobDto
}

const Job = ({ onItemClick, item }: props) => {
  return (
    <div
    className="job_item"
    key={crypto.randomUUID()}
    onClick={(e) => onItemClick(item._id)}
    >
        <div className="job__item__title">{item.company}</div>
        <div className=" job__item__subtitle">{item.title}</div>
        <BiSolidPlusCircle size={25} className="job__item__icon"/>
  </div>
  )
}

export default Job