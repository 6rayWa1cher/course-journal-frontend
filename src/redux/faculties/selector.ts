import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { compact } from 'lodash';
import { FacultyId } from 'models/faculty';

export const facultiesSelector = (state: RootState) => state.faculties;

export const facultyIdFromParamsSelector = (
  _: unknown,
  { facultyId }: { facultyId?: FacultyId }
) => facultyId ?? -1;
export const facultyIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: FacultyId[] }
) => ids;

export const facultyByIdSelector = createSelector(
  facultiesSelector,
  facultyIdFromParamsSelector,
  (state, facultyId) => state.entities[facultyId]
);

export const facultyByIdsSelector = createSelector(
  facultiesSelector,
  facultyIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const facultyNameByIdSelector = createSelector(
  facultyByIdSelector,
  (faculty) => faculty?.name
);

export const allFacultiesSelector = createSelector(facultiesSelector, (state) =>
  compact(Object.values(state.entities))
);
