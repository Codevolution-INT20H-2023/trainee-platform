import { DisplayUserProject } from '@/types/project';

export interface GridDisplayUserProject {
  id: number;
  name: string;
  stack: string;
  displayUrl: string;
  project: DisplayUserProject;
}
const transformData = (data: DisplayUserProject[]): GridDisplayUserProject[] =>
  data.map(project => ({
    id: project.id,
    name: project.name,
    stack: project.stack.join(', '),
    displayUrl: project.displayUrl,
    project,
  }));

export default transformData;
