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
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

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
    @User() { id }: CurrentUserDto,
  ) {
    return this.imagesService.uploadThumbnail({ thumbnail, userId: id, boardId });
  }

  @PostFileUploadSwagger()
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  uploadFile(@UploadedFiles() files: { files: Express.MulterS3.File[] }) {
    return this.imagesService.uploadFile(files);
  }
}
