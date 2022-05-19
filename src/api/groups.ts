import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import { FacultyId } from 'models/faculty';
import { GroupDto, GroupId, GroupRestDto } from 'models/group';
import { mainAxios } from './helpers/myaxios';

export const getGroupByIdApi = (groupId: GroupId): AxiosPromise<GroupDto> =>
  mainAxios.get(`/groups/${groupId}`);

export const getGroupsByFacultyIdApi = (
  facultyId: FacultyId
): AxiosPromise<GroupDto[]> => mainAxios.get(`/groups/faculty/${facultyId}`);

export const getGroupsByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<GroupDto[]> => mainAxios.get(`/groups/course/${courseId}`);

export const createGroupApi = (data: GroupRestDto): AxiosPromise<GroupDto> =>
  mainAxios.post('/groups/', data);

export const putGroupApi = (
  groupId: GroupId,
  data: GroupRestDto
): AxiosPromise<GroupDto> => mainAxios.put(`/groups/${groupId}`, data);

export const deleteGroupApi = (groupId: GroupId): AxiosPromise<void> =>
  mainAxios.delete(`/groups/${groupId}`);
