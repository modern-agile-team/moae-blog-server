import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Req } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(@Req() req, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').split('Bearer ')[1];

    return { ...payload, refreshToken };
  }
}
