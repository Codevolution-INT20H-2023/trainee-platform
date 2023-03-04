import { NextPage } from 'next';

import Page from '@/components/generic/page';
import HomePage from '@/components/pages/home-page';

const Home: NextPage = () => {
  return (
    <Page>
      <HomePage />
    </Page>
  );
};

export default Home;
