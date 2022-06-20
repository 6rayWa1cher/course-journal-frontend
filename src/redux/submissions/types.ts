import type { SubmissionDto, SubmissionId } from 'models/submission';

export interface SubmissionsState {
  entities: Record<SubmissionId, SubmissionDto>;
  ids: SubmissionId[];
}
