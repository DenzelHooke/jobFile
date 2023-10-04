import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import Job from './interfaces/jobs.interfaces';
import { CreateJobDto } from './dto/Job.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileSizeValidation } from 'src/upload/handling/handlers';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  // POST
  // Private endpoint
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Req() request: Request): Promise<Job[]> {
    return this.jobService.getAll(request);
  }

  // POST
  // Private endpoint
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Job | null> {
    return this.jobService.getOne(id);
  }

  // POST
  // Private endpoint
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      limits: {
        fileSize: 50000,
      },
    }),
  )
  async createOne(
    @Req() req: Request,
    @Body() createJobDto: CreateJobDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Job> {
    return this.jobService.createOne(createJobDto, req, file);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Job | null> {
    return this.jobService.deleteOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateOne(
    @Req() req: Request,
    @Body() createJobDto: CreateJobDto,
    @Param('id') id: string,
  ) {
    return this.jobService.updateOne(createJobDto, req, id);
  }
}
