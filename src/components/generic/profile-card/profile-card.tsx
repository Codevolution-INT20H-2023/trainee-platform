import { FC } from 'react';
import { Avatar } from '@mui/material';

import { User } from '@/types/auth';

import * as Styled from './profile-card.styled';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
  const userProjects = user.resume?.projects
    .map(project => project.name)
    .join(' | ');

  return (
    <Styled.Wrapper href={`/profiles/${user.id}`}>
      <Styled.Container>
        <Avatar src={user.avatar} />
        <Styled.Text>
          {user.firstName} {user.lastName}
        </Styled.Text>
        <Styled.Text>{user.email}</Styled.Text>
        <Styled.Text>{userProjects}</Styled.Text>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default ProfileCard;
