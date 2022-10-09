import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  context: string;
}
