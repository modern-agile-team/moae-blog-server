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
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

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
export function GetUserExistenceSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '유저 존재 여부 확인',
      description: '토큰 담아서 요청하면 존재 여부에 따라 true/false 반환',
    }),
  );
}

export function PostSignInSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '유저 로그인 & 회원가입',
      description: '로그인 시도, 유저가 없으면 가입처리 병행',
    }),
    ApiBody({
      type: CurrentUserDto,
      description: '로그인/회원가입 필수 정보',
      required: true,
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

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'refresh token 를 이용해 access token 재발급 (refresh token 필요)',
    }),
    ApiBody({
      type: String,
      description: 'RefreshToken',
      required: true,
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
