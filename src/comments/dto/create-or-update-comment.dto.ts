import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../entity/comment.entity';

export class CreateOrUpdateCommentDto extends PickType(CommentEntity, [
  'context',
] as const) {}
