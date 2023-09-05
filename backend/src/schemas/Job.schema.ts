import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Job from 'src/jobs/interfaces/jobs.interfaces';

// Gives typescript-specific metadata to this model
export type JobDocument = HydratedDocument<JobModel>;
export const modelName = 'Job';

// Structue of job model
@Schema()
export class JobModel {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  notes: string;

  @Prop()
  url: string;

  @Prop()
  location: string;

  @Prop()
  salary: number;

  @Prop()
  resume: string;

  @Prop()
  cover: string;

  @Prop()
  color: string;

  @Prop({ required: true })
  user: string;
}

export const JobSchema = SchemaFactory.createForClass(JobModel);
