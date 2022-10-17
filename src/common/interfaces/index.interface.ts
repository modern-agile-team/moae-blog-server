export interface Index {
  userId: number;
  boardId: number;
  commentId: number;
  likeId: number;
  categoryId: number;
}

export type BoardUserType = Pick<Index, 'userId' | 'boardId'>;
