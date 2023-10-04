import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  MaxFileSizeValidator,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata

    //500 kb
    // const size_limit = 500000;
    const size_limit = 100;
    return value.size < size_limit;
  }
}

@Injectable()
export class CustomFileSizeValidation extends MaxFileSizeValidator {
  private readonly maxSize: number;
  constructor({ maxSize }: { maxSize: number }) {
    super({ maxSize });
    this.maxSize = maxSize;
  }

  validate(value: Express.Multer.File): void {
    if (value.size > this.maxSize) {
      throw new Error(`File size exceeds 500KB`);
    }
  }
}
