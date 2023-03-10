import { FC } from 'react';

import ProfileCard from '@/components/generic/profile-card';
import { useAppSelector } from '@/hooks';

import * as Styled from './profiles-page.styled';

const ProfilesPage: FC = () => {
  const { users } = useAppSelector(state => state.auth);

  return (
    <Styled.Wrapper>
      {users.map(user => (
        <ProfileCard user={user} key={user.id} />
      ))}
    </Styled.Wrapper>
  );
};

export default ProfilesPage;
