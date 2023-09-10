import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [UsersModule,
  JwtModule.register({
    global: true,
    secret: '1234',
    signOptions: {
      expiresIn: '60s'
    }
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
