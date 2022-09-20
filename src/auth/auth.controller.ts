import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
  constructor(private readonly oauthService: AuthService) {}

  /**
   * Google Login - Redirect path /users/google/redirect
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google')
  signInWithGoogle(): void {
    return;
  }

  /**
   * Google Login - 로그인한 유저 정보 저장
   * @param currentUser { accessToken, name, email, baseUrl }
   * @returns accessToken
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async signInWithGoogleRedirect(
    @CurrentUser() { accessToken, ...user }: CurrentUserDto,
  ): Promise<object> {
    await this.oauthService.signInUser(user);
    return { accessToken };
  }
}
