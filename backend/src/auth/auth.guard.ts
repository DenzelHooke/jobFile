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

    console.log(request.cookies);
    // Getting token string

    try {
      const token = request.cookies['token'];

      if (!token) {
        throw new UnauthorizedException();
      }

      // Verifying token was not modified by client
      // Decode jwtToken
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach email from jwt to "user" parameter in request
      request['user'] = payload.sub;
      console.log(payload.sub);
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException();
    }

    return true;
  }
}
