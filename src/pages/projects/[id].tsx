import { NextPage } from 'next';

import Page from '@/components/generic/page';
import ProjectPage from '@/components/pages/project-page';

const Projects: NextPage = () => {
  return (
    <Page>
      <ProjectPage />
    </Page>
  );
};

export default Projects;
