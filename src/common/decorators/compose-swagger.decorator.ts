import { applyDecorators, UseInterceptors } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';

export function SearchBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 검색',
      description:
        'categories는 string[] 형태로, target은 name, title, context, categories 4개만 가능',
    }),
  );
}

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

export function GetOneBoardSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 단건 조회',
      description: '게시글 고유 번호에 해당하는 게시글을 조회합니다.',
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

/**
 * category_on_board api
 */
export function GetAllCategoriesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 전체 조회',
      description: '각 카테고리별 게시글 개수와 이름 응답',
    }),
  );
}

export function GetBoardsInCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리에 해당하는 게시글 조회',
      description:
        '각 카테고리별 게시글들을 최신순으로 호출, 아직 필터(정렬) 없음',
    }),
  );
}

/** User API */
export function GetUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '유저 정보 조회',
      description: '토큰으로 유저 정보 확인, 게시글도 보내줌',
    }),
  );
}

/**image API */
export function PostFileUploadSwagger(fieldName = 'files') {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 파일 저장 api',
      description: '최대 10개까지 가능하다.',
    }),
    UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }])),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'success',
    }),
  );
}

export function PostThumbnailUploadSwagger(fieldName = 'thumbnail') {
  return applyDecorators(
    ApiOperation({
      summary: '썸네일 저장 api',
      description: '1개만 저장 가능',
    }),
    UseInterceptors(FileInterceptor(fieldName)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'success',
    }),
  );
}
