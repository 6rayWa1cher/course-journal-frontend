import { chain } from 'lodash';

export const getAllIdsBy = <
  Match extends object,
  Entities extends { id: number } & Match
>(
  entities: Record<number, Entities | undefined>,
  match: Match
): number[] =>
  chain(entities)
    .values()
    .compact()
    .filter(match)
    .map((t) => t.id)
    .value();
