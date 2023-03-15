import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CurrentUserDto {
  id?: number;
  authCode?: number;

  @ApiProperty({ description: '이메일' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '이름' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '유저 사진 경로' })
  @IsNotEmpty()
  @IsString()
  baseUrl: string;
}
