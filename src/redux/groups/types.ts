import type { GroupDto, GroupId } from 'models/group';

export interface GroupsState {
  entities: Record<GroupId, GroupDto>;
  ids: GroupId[];
}
