import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comment.entity';

export class CreateOrUpdateCommentDto extends PickType(CommentEntity, [
  'context',
] as const) {}
