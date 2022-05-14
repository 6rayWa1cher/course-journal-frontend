export type FacultyId = number;

export interface FacultyDto {
  id: FacultyId;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
}

export type FacultyRestDto = Omit<
  FacultyDto,
  'id' | 'createdAt' | 'lastModifiedAt'
>;
