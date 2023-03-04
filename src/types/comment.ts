export interface Comment {
  id: number;
  createdAt: Date;
  name: string;
  parent: string[];
}

export interface CompanyPost {
  name: string;
  description: string;
  url?: string;
}
