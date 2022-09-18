import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/config/jwt/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(JWT_CONFIG)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, GoogleStrategy],
})
export class UsersModule {}
