import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { UnkownError } from 'src/exceptions/validation.exception';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File, userID: string) {
    try {
      const fileName = this.generateRandomId();
      // const buffer = await sharp(file.buffer)
      //   .resize({
      //     height: 1920,
      //     width: 1080,
      //     fit: 'contain',
      //   })
      //   .toBuffer();

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'jobfile-uploads',
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      const url = await this.genPresignedUrl(fileName);

      return {
        file: file,
        name: fileName,
        url: url,
      } as {
        file: Express.Multer.File;
        name: string;
        url: string;
      };
    } catch (error) {
      throw new UnkownError(error);
    }
  }

  generateRandomId() {
    //Generates a random id based off 21 character uuidv4
    return uuidv4();
  }

  async genPresignedUrl(key: string) {
    // 7 Days in seconds
    const expireTime: number = 604800;
    //Generates a presigned url for public viewing

    const getObjectParams = {
      Bucket: 'jobfile-uploads',
      Key: key,
    };

    const command = new GetObjectCommand(getObjectParams);

    //Presigned url
    return await getSignedUrl(this.s3Client, command, {
      expiresIn: expireTime,
    });
  }

  async generatePresignedUrl() {}
}
