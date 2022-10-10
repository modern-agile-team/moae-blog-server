import { Injectable } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
import { CommentEntity } from '../entity/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(private readonly repository: CommentEntity) {}
  /**
   * 댓글 전체를 조회하는 select문
   * @param boardId 게시글 고유 번호
   * @param orderBy 정렬
   */
  selectAllComment(
    boardId: number,
    orderBy = 'asc' as Prisma.SortOrder,
  ): Promise<comment[]> {
    return this.repository.comment.findMany({
      where: {
        boardId,
      },
      orderBy: {
        id: orderBy,
      },
    });
  }

  /**
   * 새로운 댓글 생성 create문
   * @param userId 로그인한 유저의 고유번호
   * @param boardId 댓글을 생성하려는 게시글 고유 번호
   * @param context 댓글 내용
   */
  createComment(
    userId: number,
    boardId: number,
    context: string,
  ): Promise<comment> {
    return this.repository.comment.create({
      data: {
        context,
        user: {
          connect: {
            id: userId,
          },
        },
        board: {
          connect: {
            id: boardId,
          },
        },
      },
    });
  }

  /**
   * 한개의 댓글 정보 update문
   * @param commentId 댓글 고유 번호
   * @param context 수정된 댓글 내용
   */
  updateComment(
    userId: number,
    commentId: number,
    context: string,
  ): Promise<Prisma.BatchPayload> {
    return this.repository.comment.updateMany({
      data: {
        context,
      },
      where: {
        id: commentId,
        userId,
      },
    });
  }

  /**
   * 한개의 댓글 delete문
   * @param commentId 삭제할 댓글 고유 번호
   */
  deleteComment(commentId: number): Promise<comment> {
    return this.repository.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
