export interface Project {
  id: number;
  name: string;
  description: string;
  memberDescription: string;
  displayUrl: string;
  stack: StackList[];
  requests: number[];
}

export enum StackList {
  MONGODB = 'MongoDB',
  JAVA = 'Java',
  GITHUB = 'GitHub',
  GIT = 'Git',
  SOLID = 'SOLID',
  JAVASCRIPT = 'JavaScript',
}

export enum Role {
  TEAM_LEAD,
  MODERATOR,
  MEMBER,
}

export interface Member {
  userId: number;
  projectId: number;
  role: Role;
  startDate: Date;
  endDate?: Date;
  responsibilities: string[];
}

export interface ProjectStore {
  projects: Project[];
}

export interface MemberStore {
  members: Member[];
}

export interface UserProject {
  id: number;
  name: string;
  description: string;
  displayUrl: string;
  role: Role;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface UpdateResponsibilitiesAction {
  userId: number;
  projectId: number;
  responsibilities: string[];
}

export interface DeleteProjectAction {
  id: number;
}

export interface CreateProjectAction {
  name: string;
  description: string;
  memberDescription: string;
  displayUrl: string;
  stack: StackList[];
}
