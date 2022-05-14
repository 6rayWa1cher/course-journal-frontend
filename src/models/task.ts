import { CourseId } from './course';

export type TaskId = number;

export interface TaskDto {
  id: TaskId;
  course: CourseId;
  taskNumber: number;
  title: string;
  description: string;
  maxScore: number;
  maxPenaltyPercent: number;
  announced: boolean;
  announcementAt: string;
  deadlinesEnabled: boolean;
  softDeadlineAt: string;
  hardDeadlineAt: string;
  createdAt: string;
  lastModifiedAt: string;
}

export type TaskRestDto = Omit<TaskDto, 'id' | 'createdAt' | 'lastModifiedAt'>;
