import { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { useRouter } from 'next/router';

import Button from '@/components/generic/button';
import Modal from '@/components/generic/modal';
import { useAppSelector } from '@/hooks';
import { showToast } from '@/redux/reducers/toast.reducer';
import { TOAST_STATUS } from '@/types/toast';

import * as Styled from './profile-page.styled';

const ProfilePage: FC = () => {
  const { users, currentUser } = useAppSelector(state => state.auth);
  const { query } = useRouter();
  const { id } = query;

  const [isSentRequest, setIsSentRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const selectedUser = useMemo(
    () => users.find(user => `${user.id}` === (id as string)),
    [users, id],
  );

  const handleSendRequest = () => {
    setIsSentRequest(true);
    dispatch(
      showToast({ status: TOAST_STATUS.SUCCESS, message: 'Letter was sent' }),
    );
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    setOpenModal(false);
    dispatch(
      showToast({ status: TOAST_STATUS.SUCCESS, message: 'Letter was sent' }),
    );
  };

  return (
    <Styled.Wrapper>
      {selectedUser && (
        <Styled.Container>
          <Styled.Heading>
            <Styled.Avatar src={selectedUser.avatar} />
            <Styled.HeadingInfo>
              <Styled.Name>
                {selectedUser.firstName} {selectedUser.lastName}
              </Styled.Name>
              <Styled.Position>{selectedUser.resume?.position}</Styled.Position>
              <Styled.Email>{selectedUser.email}</Styled.Email>
            </Styled.HeadingInfo>
          </Styled.Heading>

          <Styled.Content>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>About</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <Styled.Description>
                  {selectedUser.resume?.description}
                </Styled.Description>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Stack</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.stack.map(tech => (
                    <ListItem key={tech}>
                      <ListItemIcon>
                        <Code />
                      </ListItemIcon>
                      <ListItemText>{tech}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>
                Personal info
              </Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Lightbulb />
                    </ListItemIcon>
                    <ListItemText>
                      {selectedUser.resume?.personal.age} years old
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Lightbulb />
                    </ListItemIcon>
                    <ListItemText>
                      {selectedUser.resume?.personal.nationality}
                    </ListItemText>
                  </ListItem>
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Education</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.education.map(item => (
                    <ListItem key={item}>
                      <ListItemIcon>
                        <ArrowRightAlt />
                      </ListItemIcon>
                      <ListItemText>{item}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Languages</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.languages.map(language => (
                    <ListItem key={language}>
                      <ListItemIcon>
                        <Language />
                      </ListItemIcon>
                      <ListItemText>{language}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Skills</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.skills?.map(skill => (
                    <ListItem key={skill}>
                      <ListItemIcon>
                        <ArrowRightAlt />
                      </ListItemIcon>
                      <ListItemText>{skill}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Stack</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.stack.map(item => (
                    <ListItem key={item}>
                      <ListItemIcon>
                        <TimelineOutlined />
                      </ListItemIcon>
                      <ListItemText>{item}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Projects</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                {selectedUser.resume?.projects?.map(project => (
                  <Styled.Project key={project.name}>
                    <Styled.ProjectTitle>
                      {project.url ? (
                        <Styled.Link href={project.url}>
                          {project.name}
                        </Styled.Link>
                      ) : (
                        project.name
                      )}
                    </Styled.ProjectTitle>
                    <Styled.Description>Responsibilities</Styled.Description>
                    <List>
                      {project.responsibilities.map((resp, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <ArrowRightAlt />
                          </ListItemIcon>
                          <ListItemText>{resp}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Styled.Project>
                ))}
              </Styled.ContentSectionBody>
            </Styled.ContentSection>
            <Styled.ContentSection>
              <Styled.ContentSectionTitle>Contacts</Styled.ContentSectionTitle>
              <Styled.ContentSectionBody>
                <List>
                  {selectedUser.resume?.contacts.map(contact => (
                    <ListItem key={contact.name}>
                      <ListItemIcon>
                        <People />
                      </ListItemIcon>
                      <ListItemText>
                        {contact.url ? (
                          <Styled.Link href={contact.url} target="_blank">
                            {contact.name}
                          </Styled.Link>
                        ) : (
                          contact.name
                        )}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Styled.ContentSectionBody>
            </Styled.ContentSection>

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
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  title="Hunt candidate"
                >
                  <TextField fullWidth multiline rows={4} />
                  <Button
                    text="Send"
                    endIcon={<Send />}
                    onClick={handleSubmit}
                  />
                </Modal>
              </>
            )}
          </Styled.Content>
        </Styled.Container>
      )}
    </Styled.Wrapper>
  );
};

export default ProfilePage;
