export interface Project {
  id: number;
  name: string;
  description: string;
  displayUrl: string;
  stack: StackList[];
  requests: string[];
}

export enum StackList {
  MONGODB = 'MongoDB',
}

export enum Role {
  TEAM_LEAD,
  MODERATOR,
  MEMBER,
}

export interface Member {
  userId: number;
  projectId: string;
  role: Role;
  startDate: Date;
  endDate?: Date;
}
