import { CriteriaId } from './criteria';
import { GroupId } from './group';
import { TaskId } from './task';

export type SubmissionId = number;

export interface SubmissionDto {
  id: SubmissionId;
  task: TaskId;
  student: GroupId;
  submittedAt: string;
  satisfiedCriteria: CriteriaId[];
  mainScore: number;
  additionalScore: number;
  createdAt: string;
  lastModifiedAt: string;
}

export type SubmissionRestDto = Omit<
  SubmissionDto,
  'id' | 'createdAt' | 'lastModifiedAt' | 'headman'
>;
