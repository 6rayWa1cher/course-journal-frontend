import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { GroupDto, GroupId } from 'models/group';
import { facultyIdFromParamsSelector } from '@redux/faculties/selector';

const groupsSelector = (state: RootState) => state.groups;

export const groupIdFromParamsSelector = (
  _: any,
  { groupId }: { groupId?: GroupId }
) => groupId ?? -1;
export const groupIdsFromParamsSelector = (
  _: any,
  { ids }: { ids: GroupId[] }
) => ids;

export const groupByIdSelector = createSelector(
  groupsSelector,
  groupIdFromParamsSelector,
  (state, groupId) => state.entities[groupId]
);

export const groupsByFacultySelector = createSelector(
  groupsSelector,
  facultyIdFromParamsSelector,
  (state, facultyId) =>
    Object.values(state.entities).filter(
      (dto): dto is GroupDto => dto?.faculty === facultyId
    )
);

export const groupsByIdsSelector = createSelector(
  groupsSelector,
  groupIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const groupsByFacultyAlphabeticalSelector = createSelector(
  groupsByFacultySelector,
  (groups) =>
    groups
      .filter((group): group is GroupDto => !!group)
      .sort((a, b) => a.name.localeCompare(b.name))
);

export const groupIdsByFacultySelector = createSelector(
  groupsByFacultySelector,
  (groups) => groups.map((g) => g.id)
);
