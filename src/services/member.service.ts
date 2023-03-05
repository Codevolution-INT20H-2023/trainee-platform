import { Member } from '@/types/project';

import DB from '../../db.json';

export class Members {
  getAll(): Member[] {
    return DB.members as unknown as Member[];
  }
}

const projectService = new Members();

export default projectService;
