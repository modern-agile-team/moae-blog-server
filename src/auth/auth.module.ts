import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../common/strategy/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config/jwt/jwt.config';
import { UsersRepository } from '../users/repository/users.repository';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule.registerAsync(JWT_CONFIG)],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersRepository, UsersService],
})
export class AuthModule {}
