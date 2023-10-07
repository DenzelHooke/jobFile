import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Buffer, fileName: string, userID: string) {
    return await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'jobfile-uploads',
        Key: `${fileName}-${userID}`,
        Body: file,
      }),
    );
  }
}
