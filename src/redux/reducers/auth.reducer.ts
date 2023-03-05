import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthService } from '@/services';
import {
  AddUserAction,
  AuthStore,
  ChangePasswordAction,
  ChangeResumeInfo,
  ChangeUserInfoAction,
  SetCurrentUserAction,
} from '@/types/auth';

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
    changePassword: (
      state,
      { payload }: PayloadAction<ChangePasswordAction>,
    ) => {
      if (state.currentUser) {
        state.currentUser.password = payload.password;
      }
    },
    changeUserInfo: (
      state,
      { payload }: PayloadAction<ChangeUserInfoAction>,
    ) => {
      if (state.currentUser) {
        state.currentUser.lastName = payload.lastName;
        state.currentUser.firstName = payload.firstName;
        state.currentUser.email = payload.email;
      }
    },
    changeResumeInfo: (state, { payload }: PayloadAction<ChangeResumeInfo>) => {
      if (state.currentUser) {
        state.currentUser.resume = payload;
      }
    },
  },
});

export const {
  addUser,
  setCurrentUser,
  changeUserInfo,
  changePassword,
  changeResumeInfo,
} = authSlice.actions;
export default authSlice.reducer;
