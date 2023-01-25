import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CurrentUserDto } from './dto/current-user.dto';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async checkUserExistence(user: CurrentUserDto): Promise<boolean> {
    return await this.usersService.checkUserExsitence(user.email);
  }

  async signInUser(user: CurrentUserDto) {
    return await this.usersService.signInUser(user);
  }

  async setToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_SECRET'),
    });

    return { accessToken, refreshToken };
  }

  async setAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async setRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '6w',
      secret: this.configService.get('REFRESH_SECRET'),
    });
  }
}
