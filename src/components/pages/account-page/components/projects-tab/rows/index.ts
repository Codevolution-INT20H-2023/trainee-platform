import { Role, UserProject } from '@/types/project';

export interface GridUserProject {
  id: number;
  name: string;
  role: Role;
  startDate: string;
  endDate: string;
  project: UserProject;
}

const transformData = (data: UserProject[]): GridUserProject[] =>
  data.map(project => ({
    id: project.id,
    name: project.name,
    role: project.role,
    startDate: project.startDate,
    endDate: project.endDate,
    project,
  }));

export default transformData;
