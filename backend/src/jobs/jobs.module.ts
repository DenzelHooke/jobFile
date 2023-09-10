import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, modelName } from 'src/schemas/Job.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: modelName,
        schema: JobSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
