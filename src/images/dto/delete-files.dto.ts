import { IsArray } from 'class-validator';

export class DeleteFilesDto {
  @IsArray()
  files: string[];
}
