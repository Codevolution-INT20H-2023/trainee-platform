import React, { FC, useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
} from '@mui/material';

import NavLink from '@/components/generic/styles/nav-link';
import { useAppSelector } from '@/hooks';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/generic';

const drawerWidth = 320;

const Drawer: FC = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAppSelector(state => state.auth);
  const isLoggedIn = !!currentUser;

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={openDrawer}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={open}
        anchor="right"
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <IconButton
          sx={{ marginRight: 'auto', paddingTop: '16px', paddingLeft: '16px' }}
          onClick={closeDrawer}
        >
          <ChevronRightIcon />
        </IconButton>
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          onClick={closeDrawer}
        >
          <List>
            <ListItem>
              <Button
                color="inherit"
                startIcon={<PeopleAltOutlinedIcon />}
                LinkComponent={NavLink}
                href={ROUTES.PROFILES}
              >
                Profiles
              </Button>
            </ListItem>
            {isLoggedIn && (
              <>
                <ListItem>
                  <Button
                    color="inherit"
                    startIcon={<BusinessCenterOutlinedIcon />}
                    href={ROUTES.PROJECTS}
                    LinkComponent={NavLink}
                  >
                    Projects
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    color="inherit"
                    startIcon={<AccountCircleOutlinedIcon />}
                    href={ROUTES.ACCOUNT}
                    LinkComponent={NavLink}
                  >
                    Account
                  </Button>
                </ListItem>
              </>
            )}
            <ListItem>
              <Button
                color="inherit"
                startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                href={ROUTES.LOGIN}
                LinkComponent={NavLink}
                onClick={handleLogout}
              >
                {isLoggedIn ? 'Log out' : 'Log in'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
