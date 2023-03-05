import { NextPage } from 'next';

import Page from '@/components/generic/page';
import ProfilesPage from '@/components/pages/profiles-page';

const Profiles: NextPage = () => {
  return (
    <Page>
      <ProfilesPage />
    </Page>
  );
};

export default Profiles;
