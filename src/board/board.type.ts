export type SearchWhere =
  | {
      categories: {
        some: {
          category: {
            name: {
              in: string[];
            };
          };
        };
      };
    }
  | {
      OR: {
        [target: string]: {
          contains: string;
        };
      }[];
    };
