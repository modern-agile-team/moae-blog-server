import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SearchBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: "검색 대상 - 'title'|'context'|'categories'|'name'" })
  target: 'title' | 'context' | 'categories' | 'name';

  @Transform(({ obj: { keyword } }) => {
    const REGEX = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return typeof keyword === 'string' ? keyword.replace(REGEX, '').trim().split(' ') : keyword;
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(30)
  @ArrayMinSize(1)
  @ApiProperty({
    type: String,
    description: '검색 키워드(categories는 string[]으로 넘겨주세요!)',
    example: 'test',
  })
  keyword: string[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, description: '스킵', example: 0, required: false })
  skip = 0;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, description: '보여줄 개수', example: 10, required: false })
  take = 10;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '오름차순/내림차순', example: 'desc', required: false })
  orderBy: 'asc' | 'desc' = 'desc';
}
