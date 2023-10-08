import { Injectable } from '@nestjs/common';
import Job from './interfaces/jobs.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { JobModel, modelName } from 'src/schemas/Job.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/Job.dto';
import { Request } from 'express';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UnkownError } from 'src/exceptions/validation.exception';
import { UploadService } from 'src/upload/upload.service';

declare module 'express' {
  interface Request {
    user: string;
  }
}

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(modelName) private jobModel: Model<JobModel>,
    private uploadService: UploadService,
  ) {}

  async getAll(request: Request): Promise<Job[]> {
    try {
      const user = request.user;
      return await this.jobModel.find({ user: user });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createOne(
    createJobDto: CreateJobDto,
    req: Request,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const userID = req.user;
      let uploaded;

      if (file) {
        uploaded = await this.uploadService.uploadFile(file, userID);
      }

      const newJob = new this.jobModel({
        ...createJobDto,
        user: userID,
        resume: uploaded && uploaded.name,
        resumeUrl: uploaded && uploaded.url,
      });

      return await newJob.save();
    } catch (error) {
      console.error(error);
      throw new UnkownError('An error has occured');
    }
  }

  async getOne(id: string): Promise<Job | null> {
    try {
      const job = await this.jobModel.findById({ _id: id });

      return job;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteOne(id: string): Promise<Job | null> {
    try {
      const job = await this.jobModel.findByIdAndDelete({ _id: id });

      return job;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateOne(createJobDto: CreateJobDto, req: Request, id: string) {
    try {
      const foundJob = await this.jobModel.findById({ _id: id });

      if (!(foundJob && foundJob.user === req.user)) {
        throw new UnauthorizedException();
      }

      // Updates job but does not create  new one if job cannot be found
      const job = await this.jobModel.findByIdAndUpdate(id, createJobDto, {
        new: false,
      });

      return job;
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException();
      }
      throw new NotFoundException();
    }
  }
}
