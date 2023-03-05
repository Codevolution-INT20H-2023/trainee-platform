import { NextPage } from 'next';

import Page from '@/components/generic/page';
import ProjectsPage from '@/components/pages/projects-page';

const Projects: NextPage = () => {
  return (
    <Page>
      <ProjectsPage />
    </Page>
  );
};

export default Projects;
