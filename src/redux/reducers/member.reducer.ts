import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MemberService } from '@/services';
import {} from '@/types/auth';
import { MemberStore, UpdateResponsibilitiesAction } from '@/types/project';

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
  },
});

export const { updateResponsibilities } = memberSlice.actions;
export default memberSlice.reducer;
