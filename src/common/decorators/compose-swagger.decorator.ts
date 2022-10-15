import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SelectBoardDto } from '../../boards/dto/select-board.dto';
import { BoardsEntity } from '../../boards/boards.entity';
import { CreateBoardDto } from '../../boards/dto/create-board.dto';
import { UpdateBoardDto } from '../../boards/dto/update-board.dto';

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
      type: BoardsEntity,
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
      type: BoardsEntity,
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
