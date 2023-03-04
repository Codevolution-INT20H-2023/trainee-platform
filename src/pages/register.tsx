import { NextPage } from 'next';

import Page from '@/components/generic/page';
import RegisterPage from '@/components/pages/register-page';

const Register: NextPage = () => {
  return (
    <Page>
      <RegisterPage />
    </Page>
  );
};

export default Register;
