import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File, userID: string) {
    console.log(file);
    console.log(userID);
  }
}
