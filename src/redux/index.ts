import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import authReducer from '@/redux/reducers/auth.reducer';
import memberReducer from '@/redux/reducers/member.reducer';
import projectReducer from '@/redux/reducers/projects.reducer';
import toastReducer from '@/redux/reducers/toast.reducer';

const makeStore = () =>
  configureStore({
    reducer: {
      toast: toastReducer,
      auth: authReducer,
      projects: projectReducer,
      members: memberReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
