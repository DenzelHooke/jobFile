import { Injectable } from '@nestjs/common';
import Job from './interfaces/jobs.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { JobModel, modelName } from 'src/schemas/Job.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/Job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(modelName) private jobModel: Model<JobModel>) {}

  async getAll(): Promise<Job[]> {
    return await this.jobModel.find();
  }

  async createOne(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = new this.jobModel(createJobDto);

    return await newJob.save();
  }

  async getOne(id: string): Promise<Job | null> {
    const job = this.jobModel.findById({ _id: id });

    return await job;
  }
}
