import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { UploadThumbnailDto } from './dto/upload-thumbnail.dto';
import { UpdateBoardDto } from '../board/dto/update-board.dto';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { DeleteFilesDto } from './dto/delete-files.dto';

@Injectable()
export class ImagesService {
  private readonly cdnUrl: string;
  private readonly s3: S3Client;
  constructor(
    private readonly boardService: BoardService,
    private readonly configService: ConfigService,
  ) {
    this.cdnUrl = this.configService.get('AWS_CLOUDFRONT_URL');
    this.s3 = new S3Client({ region: configService.get('AWS_BUCKET_REGION') });
  }

  async uploadFile(files: { files: Express.MulterS3.File[] }) {
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

  async deleteFiles(dto: DeleteFilesDto) {
    const Objects = dto.files.reduce((result, value) => {
      result.push({ Key: value });
      return result;
    }, []);

    const command = new DeleteObjectsCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Delete: {
        Objects,
      },
    });
    await this.s3.send(command);
    return dto;
  }
}
