import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  context: string;
}
