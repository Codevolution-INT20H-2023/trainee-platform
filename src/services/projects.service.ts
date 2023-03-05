import { Project } from '@/types/project';

import DB from '../../db.json';

export class Projects {
  getAll(): Project[] {
    return DB.projects;
  }
}

const projectService = new Projects();

export default projectService;
