import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  baseUrl: string;

  @IsOptional()
  @IsString()
  accessToken?: string;
}
