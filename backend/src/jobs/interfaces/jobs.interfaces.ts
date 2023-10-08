// Structue of job item

export default interface Job {
  id?: string;
  title: string;
  company: string;
  notes?: string;
  url?: string;
  location?: string;
  color?: string;
  salary?: number;
  resume?: string;
  cover?: string;
  resumeUrl?: string;
  coverUrl?: string;
  user: string;
}
