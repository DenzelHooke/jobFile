import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import keys from './config/keys';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
    MongooseModule.forRoot(process.env.MONGO_URI ? process.env.MONGO_URI : ''),
    UsersModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadService],
})
export class AppModule {}
