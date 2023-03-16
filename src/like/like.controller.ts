import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCountDto } from './dto/get-count.dto';
import { RequestLikeDto } from './dto/request-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { TokenDto } from 'src/common/dtos/token.dto';

@ApiBearerAuth('accessToken')
@ApiTags('like API')
@Controller('likes')
export class LikeController {
  constructor(private readonly likesService: LikeService) {}

  @HttpCode(HttpStatus.OK)
  @Get('count')
  async getCount(@Query() data: GetCountDto): Promise<number> {
    return await this.likesService.getCount(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOne(@Query() data: RequestLikeDto, @User() { sub }: TokenDto) {
    data.userId = sub;
    return await this.likesService.getOneLike(data);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLike(@Body() data: RequestLikeDto, @User() { sub }: TokenDto) {
    data.userId = sub;
    return await this.likesService.createLike(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteLike(@Body() data: RequestLikeDto, @User() { sub }: TokenDto) {
    data.userId = sub;
    return await this.likesService.deletedLike(data);
  }
}
