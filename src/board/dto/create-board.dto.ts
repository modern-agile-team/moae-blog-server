import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '글 제목' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '글 내용' })
  context: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '썸네일' })
  thumbnail: string | null;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: '카테고리 내용' })
  categories: string[];
}
