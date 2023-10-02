export interface CreateJobDto {
  title: string;
  company: string;
  notes?: string;
  url?: string;
  location?: string;
  color?: string;
  salary?: number;
  resume?: string;
  cover?: string;
}
