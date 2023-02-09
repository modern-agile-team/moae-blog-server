import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '글 제목' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '글 내용' })
  context: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '썸네일' })
  thumbnail = null;
}
