import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Edit } from '@mui/icons-material';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-premium';

import Button from '@/components/generic/button';
import NavLink from '@/components/generic/styles/nav-link';
import { addMember } from '@/redux/reducers/member.reducer';
import {
  deleteProject,
  deleteRequest,
} from '@/redux/reducers/projects.reducer';
import { ROUTES } from '@/types/generic';
import { Project, Role } from '@/types/project';

import * as Styled from '../project-page.styled';

export interface GridMemberProject {
  firstName: string;
  lastName: string;
  id: number;
  role: string;
  email: string;
  startDate: string;
  project: Project;
}

export const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  {
    field: 'project',
    width: 200,
    headerName: 'Editing',
    renderCell: (props: GridRenderCellParams<GridMemberProject>) =>
      props.value && (
        <Styled.Actions>
          <Button
            text="Open"
            style={{ color: 'white' }}
            startIcon={<Edit />}
            LinkComponent={NavLink}
            href={`${ROUTES.PROFILES}/${props.row.id}`}
          />
          {!props.row.role && (
            <HuyniKnopki id={props.row.id} projectId={props.row.project.id} />
          )}
        </Styled.Actions>
      ),
  },
];

interface HuyniKnopkiProps {
  id: number;
  projectId: number;
}

const HuyniKnopki: FC<HuyniKnopkiProps> = ({ id, projectId }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        text="Accept"
        startIcon={<ThumbDownOffAltOutlinedIcon />}
        LinkComponent={NavLink}
        onClick={() => {
          dispatch(deleteRequest({ userId: id, projectId }));
          dispatch(addMember({ userId: id, projectId }));
        }}
      />
      <Button
        text="Decline"
        startIcon={<ThumbUpOffAltOutlinedIcon />}
        LinkComponent={NavLink}
        onClick={() => {
          dispatch(deleteRequest({ userId: id, projectId }));
        }}
      />
    </>
  );
};
