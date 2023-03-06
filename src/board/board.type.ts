export type SearchWhere = {
  OR: {
    [target: string]: {
      contains: string;
    };
  }[];
};
