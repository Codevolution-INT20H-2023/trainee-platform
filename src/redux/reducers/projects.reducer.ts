import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProjectService } from '@/services';
import {} from '@/types/auth';
import {
  AddMemberAction,
  CreateProjectAction,
  DeleteProjectAction,
  ProjectStore,
} from '@/types/project';

const initialState: ProjectStore = {
  projects: ProjectService.getAll(),
};

const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    deleteProject: (state, { payload }: PayloadAction<DeleteProjectAction>) => {
      const index = state.projects.findIndex(p => p.id === payload.id);
      if (index === -1) return;
      state.projects.splice(index, 1);
    },
    createProject: (state, { payload }: PayloadAction<CreateProjectAction>) => {
      state.projects.push({
        id: state.projects.length + 1,
        ...payload,
        requests: [],
      });
    },
    deleteRequest: (state, { payload }: PayloadAction<AddMemberAction>) => {
      const project = state.projects.find(p => p.id === payload.projectId);
      if (project) {
        const index = project.requests.indexOf(payload.userId);
        project.requests.splice(index, 1);
      }
    },
  },
});

export const { deleteProject, createProject, deleteRequest } =
  projectSlice.actions;
export default projectSlice.reducer;
