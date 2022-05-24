import type { CriteriaDto, CriteriaId } from 'models/criteria';

export interface CriteriaState {
  entities: Record<CriteriaId, CriteriaDto>;
  ids: CriteriaId[];
}
