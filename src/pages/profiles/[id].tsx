import { NextPage } from 'next';

import Page from '@/components/generic/page';
import ProfilePage from '@/components/pages/profile-page';

const Profile: NextPage = () => {
  return (
    <Page>
      <ProfilePage />
    </Page>
  );
};

export default Profile;
