import { CourseId } from './course';

export type TaskId = number;

export interface TaskDto {
  id: TaskId;
  course: CourseId;
  taskNumber: number | null;
  title: string;
  description: string | null;
  maxScore: number | null;
  maxPenaltyPercent: number | null;
  announced: boolean | null;
  announcementAt: string | null;
  deadlinesEnabled: boolean | null;
  softDeadlineAt: string | null;
  hardDeadlineAt: string | null;
  createdAt: string;
  lastModifiedAt: string;
}

export type TaskRestDto = {
  course: CourseId;
  taskNumber?: number;
  title: string;
  description?: string;
  maxScore?: number;
  maxPenaltyPercent?: number;
  announced?: boolean;
  announcementAt?: string;
  deadlinesEnabled?: boolean;
  softDeadlineAt?: string;
  hardDeadlineAt?: string;
};

export type ShortTaskRestDto = Omit<TaskDto, 'description'>;
