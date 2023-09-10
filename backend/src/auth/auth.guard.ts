import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { Request } from 'express';

type PayloadType = {
  sub: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // SwitchToHttp switches our context to the http context which contains request data like headers, parameters, etc.
    // getRequest returns that object which contains data such as parameters, headers, url, etc.
    const request = context.switchToHttp().getRequest();

    // Getting token string
    const token =
      request.headers.authorization &&
      request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verifying token was not modified by client
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Decode jwtToken
      // const decodedJwt = this.jwtService.decode(payload) as PayloadType;
      // console.log(payload);
      // Attach email from jwt to "user" parameter in request
      request['user'] = payload.sub;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }

    return true;
  }
}
