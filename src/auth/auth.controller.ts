import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
   * @returns cookie (accessToken, refreshToken) redirect 초기 화면 url
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async signInWithGoogleRedirect(
    @CurrentUser() { ...user }: CurrentUserDto,
    @Res() res: any,
  ): Promise<any> {
    const userInfo = await this.authService.signInUser(user);

    const payload: JwtPayload = {
      sub: userInfo.id.toString(),
      email: userInfo.email,
      authCode: userInfo.authCode,
    };

    const { accessToken, refreshToken } = await this.authService.setToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    return res.redirect('/');
  }

  /**
   * LoginState - 로그인 상태 유지를 위한 refresh token을 통한 재발급
   * @header  bearer token
   * @returns cookie (accessToken, refreshToken) redirect
   *
   *
   */
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: any, @Res() res: any) {
    const { refreshToken, sub, email, authCode } = req.user as JwtPayload & {
      refreshToken: string;
    };

    const tokens = await this.authService.setToken({ sub, email, authCode });

    res.cookie('access-token', tokens.accessToken);
    res.cookie('refresh-token', tokens.refreshToken);

    res.redirect('/');
  }
}
