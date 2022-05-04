import type { PageRequest } from 'api/types';

export interface PreparedPageRequest {
  page: number;
  size: number;
  sort?: string[];
}

export const preparePageRequest = ({
  page,
  size,
  sort,
}: PageRequest): PreparedPageRequest => ({
  page,
  size: size || 20,
  sort:
    sort == null
      ? undefined
      : Object.entries(sort).map(([key, dir]) => `${key},${dir}`),
});
