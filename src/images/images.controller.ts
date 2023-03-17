import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostFileUploadSwagger, PostThumbnailUploadSwagger, User } from '../common/decorators';
import { ImagesService } from './images.service';
import { ApiTags } from '@nestjs/swagger';
import { TokenDto } from 'src/common/dtos/token.dto';

@ApiTags('image API')
@Controller('uploads')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @PostThumbnailUploadSwagger()
  @UseGuards(AuthGuard('jwt'))
  @Post('/thumbnail/:boardId')
  uploadThumbnail(
    @UploadedFile() thumbnail: Express.MulterS3.File,
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() { sub }: TokenDto,
  ) {
    return this.imagesService.uploadThumbnail({ thumbnail, userId: sub, boardId });
  }

  @PostFileUploadSwagger()
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  uploadFile(@UploadedFiles() files: { files: Express.MulterS3.File[] }) {
    return this.imagesService.uploadFile(files);
  }
}
