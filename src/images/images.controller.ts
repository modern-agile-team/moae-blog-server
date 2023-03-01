import {
  BadRequestException,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import {
  PostFileUploadSwagger,
  PostThumbnailUploadSwagger,
  User,
} from '../common/decorators';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/webp',
  'image/jpeg',
  'image/gif',
];

@ApiBearerAuth('accessToken')
@ApiTags('image API')
@Controller('uploads')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @PostFileUploadSwagger()
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 10 }], {
      fileFilter: (req, file, callback) => {
        const ext = file.mimetype;
        if (!imageType.includes(ext)) {
          callback(new BadRequestException('이미지 타입만 가능'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFiles() files: { files: Express.MulterS3.File[] }) {
    return this.imagesService.uploadFile(files);
  }

  @PostThumbnailUploadSwagger()
  @Post('/thumbnail/:boardId')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      fileFilter: (req, file, callback) => {
        const ext = file.mimetype;
        if (!imageType.includes(ext)) {
          callback(new BadRequestException('이미지 타입만 가능'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadThumbnail(
    @UploadedFile() thumbnail: Express.MulterS3.File,
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() userId: number,
  ) {
    const dto = {
      thumbnail,
      userId,
      boardId,
    };
    return this.imagesService.uploadThumbnail(dto);
  }
}
