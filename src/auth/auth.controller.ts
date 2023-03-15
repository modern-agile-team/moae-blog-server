import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserDto } from './dto/current-user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { CacheService } from '../cache/cache.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetUserExistenceSwagger,
  PostSignInSwagger,
  RefreshTokenSwagger,
} from '../common/decorators/compose-swagger.decorator';
import { TokenDto } from './dto/token.dto';
import { User } from 'src/common/decorators';

@ApiTags('auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * New Login Flow
   */
  @GetUserExistenceSwagger()
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Get('existence')
  async checkUserExistence(@User() user: CurrentUserDto): Promise<boolean> {
    return await this.authService.checkUserExistence(user);
  }

  @PostSignInSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-in')
  async signIn(@Body() user: CurrentUserDto) {
    const { id, authCode } = await this.authService.signInUser(user);
    const payload: JwtPayload = { userId: id, authCode };
    const { accessToken, refreshToken }: TokenDto = await this.authService.setToken(payload);

    await this.cacheService.set(id.toString(), refreshToken, 604800);

    return { accessToken, refreshToken, userId: id, authCode };
  }

  /**
   * LoginState - 로그인 상태 유지를 위한 refresh token 통한 재발급
   * @header  bearer refresh token
   * @returns body (accessToken, refreshToken)
   *
   */
  @RefreshTokenSwagger()
  @ApiBearerAuth('accessToken')
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(
    @User() { userId, authCode, refreshToken }: JwtPayload & { refreshToken: string },
  ): Promise<TokenDto> {
    const accessToken: string = await this.authService.setAccessToken({ userId, authCode });
    const madeNewTokens: TokenDto = { accessToken, refreshToken };
    const redisRefreshToken: string = await this.cacheService.get(userId.toString());

    if (!redisRefreshToken) {
      const refreshToken: string = await this.authService.setRefreshToken({ userId, authCode });
      await this.cacheService.set(userId.toString(), refreshToken, 604800);

      madeNewTokens.refreshToken = refreshToken;
    }
    return { accessToken, refreshToken };
  }
}
