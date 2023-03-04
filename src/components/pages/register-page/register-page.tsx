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
import { addUser } from '@/redux/reducers/auth.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { AuthService } from '@/services';
import { RegisterForm } from '@/types/auth';
import { TOAST_STATUS } from '@/types/toast';

import { initialValues } from './constants';
import { validationSchema } from './validation';
import { ROUTES } from '@/types/generic';

const RegisterPage: FC = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ confirmPassword, ...data }: RegisterForm) => {
      try {
        const { user } = AuthService.register(data);
        console.log(user);
        dispatch(addUser({ user }));
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
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
    >
      {({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <FormField required name="firstName" type="text" label="First name" />
          <FormField required name="lastName" type="text" label="Last name" />
          <FormField required name="email" type="email" label="Email" />
          <FormField
            required
            name="password"
            type="password"
            label="Password"
          />
          <FormField
            required
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />

          <FormButtonsContainer>
            <Button type="submit" text="signup" endIcon={<Send />} />
          </FormButtonsContainer>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default RegisterPage;
