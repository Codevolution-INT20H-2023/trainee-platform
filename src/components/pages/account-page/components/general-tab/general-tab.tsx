import { FC, useEffect } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/generic/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/generic/form';
import { useAppSelector } from '@/hooks';
import { changePassword, changeUserInfo } from '@/redux/reducers/auth.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import {
  ChangePasswordFormData,
  ChangeUserInfoFormData,
  InitialPasswordData,
  InitialUserInfoData,
} from '@/types/auth';
import { ROUTES } from '@/types/generic';
import { TOAST_STATUS } from '@/types/toast';

import * as Styled from './general-tab.styled';
import { validationFieldsSchema, validationPasswordSchema } from './validation';

const GeneralTab: FC = () => {
  const { currentUser } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();

  const initialValuesFields: InitialUserInfoData = {
    firstName: currentUser?.firstName ?? '',
    lastName: currentUser?.lastName ?? '',
    email: currentUser?.email ?? '',
  };

  const initialValuesPassword: InitialPasswordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (data: ChangeUserInfoFormData) => {
    dispatch(changeUserInfo(data));
  };

  const handlePasswordChange = ({
    oldPassword,
    newPassword,
  }: ChangePasswordFormData) => {
    if (oldPassword !== currentUser?.password) {
      dispatch(
        showToast({
          status: TOAST_STATUS.ERROR,
          message: 'Old password is incorrect',
        }),
      );
    }
    dispatch(changePassword({ password: newPassword }));
  };

  return (
    <Styled.Container>
      <Formik
        initialValues={initialValuesFields}
        enableReinitialize
        validationSchema={validationFieldsSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, initialValues, values }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FormField
              required
              name="firstName"
              label="First name"
              type="text"
            />
            <FormField required name="lastName" label="Last name" type="text" />
            <FormField required name="email" label="Email" type="email" />
            <FormButtonsContainer>
              <Button
                type="submit"
                text="Update"
                disabled={!isValid || shallowEqual(initialValues, values)}
              />
            </FormButtonsContainer>
          </FormWrapper>
        )}
      </Formik>
      <Formik
        initialValues={initialValuesPassword}
        validationSchema={validationPasswordSchema}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handlePasswordChange}
      >
        {({ handleSubmit, isValid, errors }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FormField
              required
              name="oldPassword"
              type="password"
              label="Password"
            />
            <FormField
              required
              name="newPassword"
              type="password"
              label="Password"
              disabled={!!errors.oldPassword}
            />
            <FormField
              required
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              disabled={!!errors.newPassword}
            />
            <FormButtonsContainer>
              <Button type="submit" text="Update" disabled={!isValid} />
            </FormButtonsContainer>
          </FormWrapper>
        )}
      </Formik>
    </Styled.Container>
  );
};

export default GeneralTab;
