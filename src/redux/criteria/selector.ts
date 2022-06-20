import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { CriteriaDto, CriteriaId } from 'models/criteria';
import { taskIdFromParamsSelector } from '@redux/tasks/selector';
import { sumBy } from 'lodash';

export const criteriaSelector = (state: RootState) => state.criteria;

export const criteriaIdFromParamsSelector = (
  _: unknown,
  { criteriaId }: { criteriaId?: CriteriaId }
) => criteriaId ?? -1;
export const criteriaIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: CriteriaId[] }
) => ids;

export const criteriaByIdSelector = createSelector(
  criteriaSelector,
  criteriaIdFromParamsSelector,
  (state, criteriaId) => state.entities[criteriaId]
);

export const criteriaByTaskSelector = createSelector(
  criteriaSelector,
  taskIdFromParamsSelector,
  (state, taskId) =>
    Object.values(state.entities).filter(
      (dto): dto is CriteriaDto => dto?.task === taskId
    )
);

export const criteriaByIdsSelector = createSelector(
  criteriaSelector,
  criteriaIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const criteriaByFacultyAlphabeticalSelector = createSelector(
  criteriaByTaskSelector,
  (criteria) =>
    criteria
      .filter((criteria): criteria is CriteriaDto => !!criteria)
      .sort((a, b) => a.name.localeCompare(b.name))
);

export const criteriaIdsByTaskSelector = createSelector(
  criteriaByTaskSelector,
  (criteria) => criteria.map((g) => g.id)
);

export const allCriteriaEntitiesSelector = createSelector(
  criteriaSelector,
  (state) => state.entities
);

export const normalizedCriteriaByTaskSelector = createSelector(
  criteriaByTaskSelector,
  (criteria) => {
    const normalizeConstant = (() => {
      const sum = sumBy(criteria, 'criteriaPercent');
      return sum != 0 ? 100 / sum : 0;
    })();
    return criteria.map(({ criteriaPercent, ...other }) => ({
      ...other,
      criteriaPercent: Math.round(criteriaPercent * normalizeConstant),
    }));
  }
);
