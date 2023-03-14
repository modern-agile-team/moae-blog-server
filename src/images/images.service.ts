import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { UploadThumbnailDto } from './dto/upload-thumbnail.dto';
import { UpdateBoardDto } from '../board/dto/update-board.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly cdnUrl: string;
  constructor(
    private readonly boardService: BoardService,
    private readonly configService: ConfigService,
  ) {
    this.cdnUrl = this.configService.get('AWS_CLOUDFRONT_URL');
  }

  uploadFile(files: { files: Express.MulterS3.File[] }) {
    if (!files) {
      throw new BadRequestException('no file exist');
    }
    return { names: files.files.map(({ key }) => this.cdnUrl + '/' + key) };
  }

  async uploadThumbnail(dto: UploadThumbnailDto) {
    if (!dto.thumbnail) {
      throw new BadRequestException('no file exist');
    }
    const thumbnail = this.cdnUrl + '/' + dto.thumbnail.key.split('/').at(-1);
    await this.boardService.update(dto, <UpdateBoardDto>{ thumbnail });
    return { name: thumbnail };
  }
}
