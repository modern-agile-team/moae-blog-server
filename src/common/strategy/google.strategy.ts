import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrentUserDto } from '../../auth/dto/current-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_ID'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, email, picture } = profile._json;
    const user: CurrentUserDto = {
      email,
      name,
      baseUrl: picture,
      accessToken,
    };

    done(null, user);
  }
}
