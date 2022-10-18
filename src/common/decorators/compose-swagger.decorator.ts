import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SelectBoardDto } from '../../board/dto/select-board.dto';
import { BoardEntity } from '../../board/board.entity';
import { CreateBoardDto } from '../../board/dto/create-board.dto';
import { UpdateBoardDto } from '../../board/dto/update-board.dto';
import { CreateOrUpdateCommentDto } from 'src/comment/dto/create-or-update-comment.dto';

export function GetAllBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 전체 조회',
    }),
    ApiParam({
      name: 'param',
      type: SelectBoardDto,
    }),
    ApiResponse({
      status: 200,
      description: 'success',
      type: BoardEntity,
      isArray: true,
    }),
  );
}

export function PostBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 생성(token 필요)',
    }),
    ApiBody({
      type: CreateBoardDto,
    }),
    ApiCreatedResponse({
      description: 'success',
      type: BoardEntity,
      isArray: true,
    }),
  );
}

export function PatchBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 수정(token 필요)',
    }),
    ApiBody({
      type: UpdateBoardDto,
    }),
    ApiResponse({
      status: 200,
      description: 'success',
      type: () => Number,
    }),
  );
}

export function DeleteBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 삭제(token 필요)',
    }),
    ApiResponse({
      status: 200,
      description: 'success',
      type: () => Number,
    }),
  );
}

export function GetAllCommentsOnBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '한개 게시글의 모든 댓글 조회',
      description: '게시글 고유 번호에 해당하는 모든 댓글을 조회합니다.',
    }),
  );
}

export function PostCommentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '한개 게시글에 댓글 생성',
      description: '댓글을 생성하는 API 입니다.',
    }),
    ApiBody({
      type: CreateOrUpdateCommentDto,
      description: '댓글 내용을 입력해 주세요. 길이 최소 1 ~ 최대 500',
      required: true,
    }),
  );
}

export function PutCommentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '댓글 수정',
      description: '댓글을 수정하는 API 입니다.',
    }),
    ApiBody({
      type: CreateOrUpdateCommentDto,
      description: '수정할 댓글 내용을 입력해 주세요. 길이 최소 1 ~ 최대 500',
      required: true,
    }),
  );
}

export function DeleteCommentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '한 개의 댓글 삭제',
      description: '한개 댓글을 삭제합니다.',
    }),
  );
}

/**
 * auth api
 * 1. auth/google
 *
 */

export function GetGoogleAuthSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '구글 연동',
      description: '얘는.. 어떻게 테스트..?',
    }),
  );
}

export function GetGoogleRedirectSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '구글 연동 후 로그인 - auth/google하게 되면 알아서 실행',
      description:
        'moae access token 과 refresh token 발급' +
        '성공하게 되면 page로 redirect 후 cookie에 토큰 저장',
    }),
  );
}

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'refresh token 를 이용해 access token 재발급 (refresh token 필요)',
    }),
    ApiResponse({
      schema: {
        example: {
          accessToken: 'access token 내용',
          refreshToken: 'refresh token 내용',
        },
      },
      status: 201,
      description: 'success',
    }),
  );
}
