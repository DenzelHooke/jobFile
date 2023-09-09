import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
    constructor(type: string) {
        super(`User already exists with that ${type}`, HttpStatus.CONFLICT)
    }
}

