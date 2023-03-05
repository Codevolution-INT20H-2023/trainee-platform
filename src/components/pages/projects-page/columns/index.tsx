import { Edit } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import Button from '@/components/generic/button';
import NavLink from '@/components/generic/styles/nav-link';
import { GridUserProject } from '@/components/pages/account-page/components/projects-tab/rows';
import { ROUTES } from '@/types/generic';

import * as Styled from '../projects-page.styled';

export const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 50 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'stack', headerName: 'Technology Stack', width: 600 },
  {
    field: 'project',
    width: 150,
    headerName: 'Editing',
    renderCell: (props: GridRenderCellParams<GridUserProject>) =>
      props.value && (
        <Styled.Actions>
          <Button
            text="OPEN"
            startIcon={<Edit />}
            LinkComponent={NavLink}
            href={`${ROUTES.PROJECTS}/${props.value.id}`}
          />
        </Styled.Actions>
      ),
  },
];
