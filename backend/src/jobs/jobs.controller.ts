import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import Job from './interfaces/jobs.interfaces';
import { CreateJobDto } from './dto/Job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Get()
  async getAll(): Promise<Job[]> {
    return this.jobService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Job | null> {
    return this.jobService.getOne(id);
  }

  @Post()
  async createOne(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobService.createOne(createJobDto);
  }
}
