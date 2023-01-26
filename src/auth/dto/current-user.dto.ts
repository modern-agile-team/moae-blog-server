import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '유저 사진 경로' })
  baseUrl: string;
}
