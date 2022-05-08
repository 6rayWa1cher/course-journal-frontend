import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createGroupApi,
  deleteGroupApi,
  getGroupByIdApi,
  getGroupsByFacultyIdApi,
  putGroupApi,
} from 'api/groups';
import { FacultyId } from 'models/faculty';
import { GroupId, GroupRestDto } from 'models/group';

export interface GroupByIdArgs {
  groupId: GroupId;
}

export const getGroupByIdThunk = createAxiosAsyncThunk(
  'groups/getById',
  async ({ groupId }: GroupByIdArgs) => {
    const data = (await getGroupByIdApi(groupId)).data;
    return data;
  }
);

export interface GetGroupsByFacultyIdArgs {
  facultyId: FacultyId;
}

export const getGroupsByFacultyIdThunk = createAxiosAsyncThunk(
  'groups/getAll',
  async ({ facultyId }: GetGroupsByFacultyIdArgs) => {
    const data = (await getGroupsByFacultyIdApi(facultyId)).data;
    return data;
  }
);

export const createGroupThunk = createAxiosAsyncThunk(
  'groups/create',
  async (args: GroupRestDto) => {
    const employee = (await createGroupApi(args)).data;
    return employee;
  }
);

export interface PutGroupArgs {
  groupId: GroupId;
  data: GroupRestDto;
}

export const putGroupThunk = createAxiosAsyncThunk(
  'groups/put',
  async ({ groupId, data }: PutGroupArgs) => {
    const employee = (await putGroupApi(groupId, data)).data;
    return employee;
  }
);

export type DeleteGroupArgs = GroupByIdArgs;

export const deleteGroupThunk = createAxiosAsyncThunk(
  'groups/delete',
  async ({ groupId }: DeleteGroupArgs) => {
    await deleteGroupApi(groupId);
    return groupId;
  }
);
