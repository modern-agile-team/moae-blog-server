import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  DeleteFileUploadSwagger,
  PostFileUploadSwagger,
  PostThumbnailUploadSwagger,
  User,
} from '../common/decorators';
import { ImagesService } from './images.service';
import { ApiTags } from '@nestjs/swagger';
import { TokenDto } from 'src/common/dtos/token.dto';
import { DeleteFilesDto } from './dto/delete-files.dto';

@ApiTags('image API')
@Controller('uploads')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @PostThumbnailUploadSwagger()
  @UseGuards(AuthGuard('jwt'))
  @Post('/thumbnail/:boardId')
  async uploadThumbnail(
    @UploadedFile() thumbnail: Express.MulterS3.File,
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() { userId }: TokenDto,
  ) {
    return await this.imagesService.uploadThumbnail({ thumbnail, userId, boardId });
  }

  @PostFileUploadSwagger()
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async uploadFile(@UploadedFiles() files: { files: Express.MulterS3.File[] }) {
    return await this.imagesService.uploadFile(files);
  }

  @DeleteFileUploadSwagger()
  @Delete('/')
  @UseGuards(AuthGuard('jwt'))
  async deleteFiles(@Body() dto: DeleteFilesDto) {
    return await this.imagesService.deleteFiles(dto);
  }
}
