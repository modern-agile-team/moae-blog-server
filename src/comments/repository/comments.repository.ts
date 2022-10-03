import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { SelectCommentDto } from '../dto/select-comment.dto';

@Injectable()
export class CommentsRepository extends PrismaService {
  /**
   * 댓글 전체를 조회하는 select문
   * @param boardId 게시글 고유 번호
   * @param skip 페이지 네이션(페이지)
   * @param take 페이지 네이션(불러올 개수)
   * @param cursor 페이지 범위
   * @param orderBy 정렬
   */
  selectAllComment(
    boardId: number,
    { skip = 1, take = 10, cursor, orderBy }: SelectCommentDto,
  ): Promise<comment[]> {
    try {
      return this.comment.findMany({
        skip,
        take,
        cursor,
        where: {
          boardId,
        },
        orderBy,
      });
    } catch {
      throw new InternalServerErrorException('알 수 없는 서버 에러입니다.');
    }
  }

  /**
   * 한개의 댓글 select문
   * @param commentId
   */
  selectOneComment(commentId: Prisma.commentWhereUniqueInput) {
    return this.comment.findUnique({
      where: commentId,
    });
  }

  /**
   * 새로운 댓글 생성 create문
   * @param boardId 댓글을 생성하려는 게시글 고유 번호
   * @param data { userId, context }
   */
  createComment(
    boardId: number,
    { userId, context }: CreateCommentDto,
  ): Promise<comment> {
    try {
      return this.comment.create({
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
    } catch {
      throw new InternalServerErrorException('알 수 없는 서버 에러입니다.');
    }
  }

  /**
   * 한개의 댓글 정보 update문
   * @param commentId 댓글 고유 번호
   * @param context 수정된 댓글 내용
   */
  updateComment(commentId: number, context: string): Promise<comment> {
    try {
      return this.comment.update({
        data: {
          context,
        },
        where: {
          id: commentId,
        },
      });
    } catch {
      throw new InternalServerErrorException('알 수 없는 서버 에러입니다.');
    }
  }

  /**
   * 한개의 댓글 delete문
   * @param commentId 삭제할 댓글 고유 번호
   */
  deleteComment(commentId: number): Promise<comment> {
    return this.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
