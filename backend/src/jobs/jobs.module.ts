import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModel, JobSchema, modelName } from 'src/schemas/Job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: modelName,
        schema: JobSchema,
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
