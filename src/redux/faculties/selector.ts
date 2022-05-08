import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { FacultyId } from 'models/faculty';

const facultiesSelector = (state: RootState) => state.faculties;

export const facultyIdFromParamsSelector = (
  _: any,
  { facultyId }: { facultyId?: FacultyId }
) => facultyId ?? -1;
export const facultyIdsFromParamsSelector = (
  _: any,
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
