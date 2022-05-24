import { TaskId } from './task';

export type CriteriaId = number;

export interface CriteriaDto {
  id: CriteriaId;
  task: TaskId;
  name: string;
  criteriaPercent: number;
  createdAt: string;
  lastModifiedAt: string;
}

export type CriteriaRestDto = Omit<
  CriteriaDto,
  'id' | 'createdAt' | 'lastModifiedAt'
>;
