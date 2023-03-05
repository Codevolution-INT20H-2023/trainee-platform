import React, { FC, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useRouter } from 'next/router';

import GeneralTab from '@/components/pages/account-page/components/general-tab';
import ProjectsTab from '@/components/pages/account-page/components/projects-tab';
import ResumeTab from '@/components/pages/account-page/components/resume-tab';
import { useAppSelector } from '@/hooks';
import { ROUTES } from '@/types/generic';

const AccountPage: FC = () => {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { currentUser } = useAppSelector(state => state.auth);
  const { push, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!currentUser) void push(ROUTES.LOGIN);
  }, [currentUser, isReady, push]);

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="General" value="1" />
            <Tab label="Resume" value="2" />
            <Tab label="My projects" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <GeneralTab />
        </TabPanel>
        <TabPanel value="2">
          <ResumeTab />
        </TabPanel>
        <TabPanel value="3">
          <ProjectsTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AccountPage;
