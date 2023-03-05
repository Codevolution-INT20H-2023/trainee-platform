import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Page from '@/components/generic/page';
import AccountPage from '@/components/pages/account-page';
import { ROUTES } from '@/types/generic';

const Account: NextPage = () => {
  const isLoggedIn = true;
  const { push } = useRouter();

  if (!isLoggedIn) void push(ROUTES.LOGIN);

  return (
    <Page>
      <AccountPage />
    </Page>
  );
};

export default Account;
