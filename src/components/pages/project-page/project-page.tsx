import { FC, useMemo, useState } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import {
  ArrowRightAlt,
  Check,
  Code,
  Language,
  Lightbulb,
  People,
  Send,
  Spa,
  TimelineOutlined,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/generic/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/generic/form';
import GroupTable from '@/components/generic/group-table';
import Modal from '@/components/generic/modal';
import { useAppSelector } from '@/hooks';
import { showToast } from '@/redux/reducers/toast.reducer';
import { Role, StackList } from '@/types/project';
import { TOAST_STATUS } from '@/types/toast';

import { columns } from './columns';
import * as Styled from './project-page.styled';

const ProjectPage: FC = () => {
  const { users, currentUser } = useAppSelector(state => state.auth);
  const { query } = useRouter();
  const { id } = query;

  const { projects } = useAppSelector(state => state.projects);
  const { members } = useAppSelector(state => state.members);

  const project = useMemo(() => {
    if (!id) return null;
    return projects.find(p => p.id === +id);
  }, [projects, id]);

  const projectMembers = useMemo(() => {
    if (!project) return [];
    const results = [];
    for (const member of members.filter(m => m.projectId === project.id)) {
      const user = users.find(u => u.id === member.userId);
      if (user) {
        results.push({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          startDate: member.startDate,
          role: member.role,
          email: user.email,
          project,
        });
      }
    }
    if (!currentUser) return results;

    if (
      results.some(r => r.id === currentUser.id && r.role === Role.TEAM_LEAD)
    ) {
      const requests = users.filter(u => project.requests.includes(u.id));
      results.push(
        ...requests.map(r => ({
          id: r.id,
          firstName: r.firstName,
          lastName: r.lastName,
          startDate: '',
          role: '',
          email: r.email,
          project,
        })),
      );
    }

    return results;
  }, [currentUser, members, project, users]);

  console.log(projectMembers);

  const [isSentRequest, setIsSentRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSendRequest = () => {
    setIsSentRequest(true);
    dispatch(
      showToast({ status: TOAST_STATUS.SUCCESS, message: 'Letter was sent' }),
    );
  };

  const dispatch = useDispatch();

  const initialValues = {
    name: project?.name ?? '',
    description: project?.description ?? '',
    stack: project?.stack ?? [],
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSubmitLetter = () => {
    setOpenModal(false);
    dispatch(
      showToast({ status: TOAST_STATUS.SUCCESS, message: 'Letter was sent' }),
    );
  };

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Styled.Container>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, initialValues, values, setFieldValue }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FormField required name="name" label="Name" type="text" />
            <FormField
              required
              name="description"
              label="Description"
              type="text"
              multiline
              rows={4}
            />
            <Autocomplete
              onChange={(e, value) => {
                setFieldValue('stack', value);
              }}
              style={{ width: '100%' }}
              multiple
              options={Object.values(StackList)}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  name="stack"
                  label="Hard skills"
                  value={values.stack}
                />
              )}
            />

            <FormField required name="lastName" label="Last name" type="text" />
            <FormField required name="email" label="Email" type="email" />
            <FormButtonsContainer>
              <Button
                type="submit"
                text="Update"
                disabled={!isValid || shallowEqual(initialValues, values)}
              />
            </FormButtonsContainer>
          </FormWrapper>
        )}
      </Formik>

      <h2>Members</h2>
      <GroupTable columns={columns} rows={projectMembers} />

      {currentUser && `${currentUser?.id}` !== (id as string) && (
        <Button
          text="Send request"
          startIcon={isSentRequest && <Check />}
          color={isSentRequest ? 'success' : 'primary'}
          onClick={handleSendRequest}
          variant={isSentRequest ? 'outlined' : 'contained'}
        />
      )}

      {!currentUser && (
        <>
          <Button text="Hunt" onClick={handleOpen} />
          <Modal open={openModal} onClose={handleClose} title="Hunt candidate">
            <TextField fullWidth multiline rows={4} />
            <Button
              text="Send"
              endIcon={<Send />}
              onClick={() => handleSubmitLetter()}
            />
          </Modal>
        </>
      )}
    </Styled.Container>
  );
};

export default ProjectPage;
