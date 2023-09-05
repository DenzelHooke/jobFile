import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import keys from './config/keys';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JobsModule,
    MongooseModule.forRoot(process.env.MONGO_URI ? process.env.MONGO_URI : ''),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
