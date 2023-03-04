import { FC, useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';
import { Formik } from 'formik';

import Button from '@/components/generic/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/generic/form';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {}, []);

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
            <Button
              type="submit"
              text="login"
              endIcon={<Send />}
              loading={isLoading}
              disabled={isLoading}
            />
          </FormButtonsContainer>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default LoginPage;
