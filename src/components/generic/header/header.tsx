import React, { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';

import NavLink from '@/components/generic/styles/nav-link';

import Menu from './components/menu';
import * as Styled from './header.styled';

const Header: FC = () => {
  return (
    <Styled.Container>
      <AppBar position="static">
        <Toolbar>
          <Styled.Title variant="h6">
            <NavLink href="/">Code with Trainee</NavLink>
          </Styled.Title>
          <Menu />
        </Toolbar>
      </AppBar>
    </Styled.Container>
  );
};

export default Header;
