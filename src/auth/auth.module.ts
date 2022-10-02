import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../common/strategy/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config/jwt/jwt.config';
import { UsersRepository } from '../users/repository/users.repository';
import { UsersService } from '../users/users.service';
import { RefreshTokenStrategy } from '../common/strategy/refresh-token.strategy';
import { cacheModule } from 'src/config/redis/redis.config';

@Module({
  imports: [
    JwtModule.registerAsync(JWT_CONFIG),
    JwtModule.register({}),
    cacheModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    UsersRepository,
    UsersService,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
