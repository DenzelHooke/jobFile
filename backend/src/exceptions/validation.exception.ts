import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor(type: string) {
    super(`User already exists with that ${type}`, HttpStatus.CONFLICT);
  }
}

export class CredentialsNotFound extends HttpException {
  constructor() {
    super(`No user found with those credentials`, HttpStatus.FORBIDDEN);
  }
}

export class InvalidPassword extends HttpException {
  constructor() {
    super(`Invalid Password`, HttpStatus.FORBIDDEN);
  }
}

export class UnkownError extends HttpException {
  constructor(error: string) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
