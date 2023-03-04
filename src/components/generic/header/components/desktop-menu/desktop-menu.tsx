import React, { FC } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Button } from '@mui/material';

import NavLink from '@/components/generic/styles/nav-link';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/generic';

import * as Styled from '../../header.styled';

const DesktopMenu: FC = () => {
  const isLoggedIn = true;

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <Styled.Menu>
      <Button
        color="inherit"
        startIcon={<EmojiObjectsOutlinedIcon />}
        LinkComponent={NavLink}
        href={ROUTES.STARTUPS}
      >
        Startups
      </Button>
      <Button
        color="inherit"
        startIcon={<PeopleAltOutlinedIcon />}
        LinkComponent={NavLink}
        href={ROUTES.PROFILES}
      >
        Profiles
      </Button>
      {isLoggedIn && (
        <>
          <Button
            color="inherit"
            startIcon={<BusinessCenterOutlinedIcon />}
            LinkComponent={NavLink}
            href={ROUTES.PROJECTS}
          >
            Projects
          </Button>
          <Button
            color="inherit"
            startIcon={<AccountCircleOutlinedIcon />}
            LinkComponent={NavLink}
            href={ROUTES.ACCOUNT}
          >
            Account
          </Button>
        </>
      )}
      <Button
        color="inherit"
        startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        href={isLoggedIn ? '' : ROUTES.LOGIN}
        LinkComponent={NavLink}
        onClick={handleLogout}
      >
        {isLoggedIn ? 'Log out' : 'Log in'}
      </Button>
    </Styled.Menu>
  );
};

export default DesktopMenu;
