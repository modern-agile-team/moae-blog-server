import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  context: string;
}
