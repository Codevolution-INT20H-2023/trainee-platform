import { FC, useMemo } from 'react';

import GroupTable from '@/components/generic/group-table';
import { columns } from '@/components/pages/account-page/components/projects-tab/columns';
import transformData from '@/components/pages/account-page/components/projects-tab/rows';
import { useAppSelector } from '@/hooks';
import { UserProject } from '@/types/project';

import * as Styled from './projects-tab.styled';

const ProjectsTab: FC = () => {
  const { currentUser } = useAppSelector(state => state.auth);
  const { projects } = useAppSelector(state => state.projects);
  const { members } = useAppSelector(state => state.members);
  const userProjects: UserProject[] = useMemo(() => {
    const userMembers = members.filter(m => m.userId === currentUser?.id);
    const userProjects = [];
    for (const member of userMembers) {
      const project = projects.find(p => p.id === member.projectId);
      if (!project) continue;
      userProjects.push({
        id: project.id,
        name: project.name,
        displayUrl: project.displayUrl,
        description: project.description,
        startDate: new Date(member.startDate)?.toTimeString() ?? '',
        endDate: member.endDate
          ? new Date(member.endDate).toTimeString()
          : 'For now',
        role: member.role,
        responsibilities: member.responsibilities,
      });
    }

    return userProjects;
  }, [members, projects, currentUser]);

  const rows = useMemo(() => transformData(userProjects), [userProjects]);
  console.log(rows);
  return (
    <Styled.Container>
      <h2>My projects</h2>
      <GroupTable columns={columns} rows={rows} />
    </Styled.Container>
  );
};

export default ProjectsTab;
