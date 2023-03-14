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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('accessToken')
@ApiTags('image API')
@Controller('uploads')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @PostThumbnailUploadSwagger()
  @Post('/thumbnail/:boardId')
  @UseGuards(AuthGuard('jwt'))
  uploadThumbnail(
    @UploadedFile() thumbnail: Express.MulterS3.File,
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() userId: number,
  ) {
    return this.imagesService.uploadThumbnail({ thumbnail, userId, boardId });
  }

  @PostFileUploadSwagger()
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  uploadFile(@UploadedFiles() files: { files: Express.MulterS3.File[] }) {
    return this.imagesService.uploadFile(files);
  }
}
