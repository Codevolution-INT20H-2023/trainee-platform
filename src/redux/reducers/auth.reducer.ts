import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthService } from '@/services';
import { AddUserAction, AuthStore, SetCurrentUserAction } from '@/types/auth';

const initialState: AuthStore = {
  users: AuthService.getAll(),
  currentUser: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<AddUserAction>) => {
      state.users.push(payload.user);
      state.currentUser = payload.user;
    },
    setCurrentUser: (
      state,
      { payload }: PayloadAction<SetCurrentUserAction>,
    ) => {
      state.currentUser = payload.user;
    },
  },
});

export const { addUser, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
