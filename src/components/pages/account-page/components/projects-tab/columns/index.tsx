import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Delete, Edit } from '@mui/icons-material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-premium';

import Button from '@/components/generic/button';
import NavLink from '@/components/generic/styles/nav-link';
import { GridUserProject } from '@/components/pages/account-page/components/projects-tab/rows';
import { deleteProject } from '@/redux/reducers/projects.reducer';
import { ROUTES } from '@/types/generic';

import * as Styled from '../projects-tab.styled';

export const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 50 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'role', headerName: 'Position', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 250 },
  { field: 'endDate', headerName: 'End Date', width: 250 },
  {
    field: 'project',
    width: 300,
    headerName: 'Editing',
    renderCell: (props: GridRenderCellParams<GridUserProject>) =>
      props.value && (
        <Styled.Actions>
          <Button
            text="Open"
            style={{ color: 'white' }}
            startIcon={<FileOpenOutlinedIcon />}
            LinkComponent={NavLink}
            href={`${ROUTES.PROJECTS}/${props.value.id}`}
          />
          <YebanaKnopka id={props.value.id} />
        </Styled.Actions>
      ),
  },
];

interface YebanaKnopkaProps {
  id: number;
}

const YebanaKnopka: FC<YebanaKnopkaProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <Button
      text="Delete"
      startIcon={<Delete />}
      LinkComponent={NavLink}
      onClick={() => {
        dispatch(deleteProject({ id }));
      }}
    />
  );
};
