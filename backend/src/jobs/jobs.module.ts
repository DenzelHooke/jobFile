import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, modelName } from 'src/schemas/Job.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: modelName,
        schema: JobSchema,
      },
    ]),
    AuthModule,
    UploadModule,
  ],
  controllers: [JobsController],
  providers: [JobsService, UploadService],
})
export class JobsModule {}
