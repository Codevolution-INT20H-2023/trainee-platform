import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import GroupTable from '@/components/generic/group-table';
import { columns } from '@/components/pages/projects-page/columns';
import transformData from '@/components/pages/projects-page/rows';
import { useAppSelector } from '@/hooks';
import { DisplayUserProject } from '@/types/project';

import * as Styled from './projects-page.styled';

const ProjectsPage: FC = () => {
  const [isMatching, setIsMatching] = useState(false);

  const handleSetIsMatching = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsMatching(event.target.checked);
    },
    [],
  );

  const { currentUser } = useAppSelector(state => state.auth);
  const { projects } = useAppSelector(state => state.projects);
  const userProjects: DisplayUserProject[] = useMemo(() => {
    const displayProjects = projects.map(p => ({
      id: p.id,
      name: p.name,
      displayUrl: p.displayUrl,
      description: p.description,
      stack: p.stack,
    }));

    if (isMatching && currentUser) {
      return displayProjects.filter(p => {
        p.stack.some(s => currentUser.resume?.stack.includes(s));
      });
    }

    return displayProjects;
  }, [projects, isMatching, currentUser]);

  const rows = useMemo(() => transformData(userProjects), [userProjects]);
  console.log(rows);
  return (
    <Styled.Container>
      <h2>All projects</h2>
      <FormControlLabel
        control={<Switch checked={isMatching} onChange={handleSetIsMatching} />}
        label="Matches by your stack"
      />
      <GroupTable columns={columns} rows={rows} />
    </Styled.Container>
  );
};

export default ProjectsPage;
