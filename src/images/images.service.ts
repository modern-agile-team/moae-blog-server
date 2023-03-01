import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { UploadThumbnailDto } from './dto/upload-thumbnail.dto';
import { UpdateBoardDto } from '../board/dto/update-board.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly boardService: BoardService) {}

  uploadFile(files: { files: Express.MulterS3.File[] }) {
    if (!files) {
      throw new BadRequestException('no file exist');
    }
    const name = files.files.map((file) => {
      return file.key.split('/').at(-1);
    });
    return { name };
  }

  async uploadThumbnail(dto: UploadThumbnailDto) {
    if (!dto.thumbnail) {
      throw new BadRequestException('no file exist');
    }
    const thumbnail = dto.thumbnail.key.split('/').at(-1);
    await this.boardService.update(dto, <UpdateBoardDto>{ thumbnail });
    return { name: thumbnail };
  }
}
