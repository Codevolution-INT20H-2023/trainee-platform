import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Send } from '@mui/icons-material';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/generic/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/generic/form';
import { setCurrentUser } from '@/redux/reducers/auth.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { AuthService } from '@/services';
import { LoginForm } from '@/types/auth';
import { ROUTES } from '@/types/generic';
import { TOAST_STATUS } from '@/types/toast';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const onSubmit = useCallback(
    (data: LoginForm) => {
      try {
        const { user } = AuthService.login(data);
        dispatch(setCurrentUser({ user }));
        void push(ROUTES.HOME);
      } catch (e) {
        if (e instanceof Error) {
          dispatch(
            showToast({ status: TOAST_STATUS.ERROR, message: e.message }),
          );
        }
      }
    },
    [dispatch, push],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <FormField required name="email" label="Email" type="email" />
          <FormField
            required
            name="password"
            label="Password"
            type="password"
          />
          <FormButtonsContainer>
            <Button type="submit" text="login" endIcon={<Send />} />
          </FormButtonsContainer>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default LoginPage;
