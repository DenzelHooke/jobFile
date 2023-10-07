import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 3,
      },
    ]),
  ],
  controllers: [],
  providers: [UploadService],
})
export class UploadModule {}
