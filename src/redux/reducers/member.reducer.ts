import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MemberService } from '@/services';
import {
  AddMemberAction,
  MemberStore,
  Role,
  UpdateResponsibilitiesAction,
} from '@/types/project';

const initialState: MemberStore = {
  members: MemberService.getAll(),
};

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState,
  reducers: {
    updateResponsibilities: (
      state,
      { payload }: PayloadAction<UpdateResponsibilitiesAction>,
    ) => {
      const member = state.members.find(
        m => m.userId === payload.userId && m.projectId === payload.projectId,
      );
      if (member) {
        member.responsibilities = payload.responsibilities;
      }
    },
    addMember: (state, { payload }: PayloadAction<AddMemberAction>) => {
      state.members.push({
        ...payload,
        startDate: new Date(),
        role: Role.MEMBER,
        responsibilities: [],
      });
    },
  },
});

export const { updateResponsibilities, addMember } = memberSlice.actions;
export default memberSlice.reducer;
