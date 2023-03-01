import { IsNumber } from 'class-validator';

export class UploadThumbnailDto {
  thumbnail: Express.MulterS3.File;

  @IsNumber()
  userId: number;

  @IsNumber()
  boardId: number;
}
