import { FC, useMemo } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { Divider, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldArray, Formik } from 'formik';

import Button from '@/components/generic/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/generic/form';
import ProjectItem from '@/components/pages/account-page/components/resume-tab/components/project-item';
import ProjectSiteItem from '@/components/pages/account-page/components/resume-tab/components/site-project-item';
import { useAppSelector } from '@/hooks';
import { changeResumeInfo } from '@/redux/reducers/auth.reducer';
import { updateResponsibilities } from '@/redux/reducers/member.reducer';
import { SubmitChangeResumeInfo } from '@/types/auth';
import { StackList, UserProject } from '@/types/project';
import { Language, Project } from '@/types/resume';

import * as Styled from './resume-tab.styled';

const ResumeTab: FC = () => {
  const dispatch = useDispatch();
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
        startDate: new Date(member.startDate).toTimeString(),
        endDate: member.endDate
          ? new Date(member.endDate).toTimeString()
          : 'For now',
        role: member.role,
        responsibilities: member.responsibilities,
      });
    }

    return userProjects;
  }, [members, projects, currentUser]);

  const handleSubmit = ({
    userProjects,
    age,
    nationality,
    photo,
    ...resume
  }: SubmitChangeResumeInfo & { userProjects: UserProject[] }) => {
    if (!currentUser) return;
    console.log(resume);
    dispatch(
      changeResumeInfo({
        personal: {
          age,
          photo,
          nationality,
        },
        ...resume,
      }),
    );
    for (const project of userProjects) {
      dispatch(
        updateResponsibilities({
          userId: currentUser?.id,
          projectId: project.id,
          responsibilities: project.responsibilities,
        }),
      );
    }
  };

  return (
    <Styled.Container>
      <Formik
        initialValues={{
          position: '',
          description: '',
          projects: currentUser?.resume?.projects ?? [],
          education: currentUser?.resume?.education ?? [],
          languages: currentUser?.resume?.languages ?? [],
          stack: currentUser?.resume?.stack ?? [],
          userProjects,
          skills: currentUser?.resume?.skills ?? [],
          contacts: currentUser?.resume?.contacts ?? [],
          age: currentUser?.resume?.personal.age ?? 0,
          photo: currentUser?.resume?.personal.photo ?? '',
          nationality: currentUser?.resume?.personal.nationality ?? '',
        }}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          isValid,
          initialValues,
          values,
          handleChange,
          setFieldValue,
        }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FormField required name="position" label="Position" type="text" />
            <FormField
              required
              name="description"
              label="Goals"
              type="text"
              multiline
              rows={4}
            />
            <h2>Prior experience</h2>
            <FieldArray
              name="projects"
              render={({ pop, push }) => (
                <>
                  {values.projects.map((project: Project, index: number) => (
                    <ProjectItem key={index} project={project} index={index} />
                  ))}
                  <FormButtonsContainer>
                    <Styled.ProjectButtons>
                      <Button
                        type="button"
                        text="Add project"
                        onClick={() =>
                          push({
                            name: '',
                            url: '',
                            startDate: '',
                            endDate: '',
                            responsibilities: [],
                          })
                        }
                      />
                      <Button
                        type="button"
                        text="Remove project"
                        onClick={pop}
                        color="error"
                      />
                    </Styled.ProjectButtons>
                  </FormButtonsContainer>
                </>
              )}
            />
            <h2>Projects</h2>
            {values.userProjects.map((project, index: number) => (
              <ProjectSiteItem key={index} project={project} index={index} />
            ))}
            <Styled.ArrayContainer>
              <Divider />
              <h2>Skills</h2>
              <Autocomplete
                onChange={(e, value) => {
                  setFieldValue('stack', value);
                }}
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
            </Styled.ArrayContainer>
            <FieldArray
              name="skills"
              render={({ pop, push }) => (
                <>
                  {values.skills.map((skill, index: number) => (
                    <Styled.ArrayItem key={index}>
                      <FormField
                        name={`skills.${index}`}
                        required
                        type="text"
                        label={`Soft skill #${index + 1}`}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Styled.ArrayItem>
                  ))}
                  <FormButtonsContainer>
                    <Styled.ProjectButtons>
                      <Button type="button" text="+" onClick={() => push('')} />
                      <Button
                        type="button"
                        text="-"
                        onClick={pop}
                        color="error"
                      />
                    </Styled.ProjectButtons>
                  </FormButtonsContainer>
                </>
              )}
            />
            <Autocomplete
              onChange={(e, value) => {
                setFieldValue('languages', value);
              }}
              style={{ width: '100%' }}
              multiple
              options={Object.values(Language)}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  name="languages"
                  label="Languages"
                  value={values.languages}
                />
              )}
            />
            <Divider />
            <h2>Education</h2>
            <FieldArray
              name="education"
              render={({ pop, push }) => (
                <>
                  {values.education.map((education, index: number) => (
                    <Styled.ArrayItem key={index}>
                      <FormField
                        name={`education.${index}`}
                        required
                        type="text"
                        label={`Education #${index + 1}`}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Styled.ArrayItem>
                  ))}
                  <FormButtonsContainer>
                    <Styled.ProjectButtons>
                      <Button type="button" text="+" onClick={() => push('')} />
                      <Button
                        type="button"
                        text="-"
                        onClick={pop}
                        color="error"
                      />
                    </Styled.ProjectButtons>
                  </FormButtonsContainer>
                </>
              )}
            />
            <Divider />
            <h2>Personal Info</h2>
            <FormField name="age" label="Age" type="number" />
            <FormField name="photo" label="Photo URL" type="text" />
            <FormField name="nationality" label="Nationality" type="text" />
            <Divider />
            <h2>Contacts</h2>
            <FieldArray
              name="contacts"
              render={({ pop, push }) => (
                <>
                  {values.contacts.map((contact, index: number) => (
                    <Styled.ArrayItem key={index}>
                      <FormField
                        name={`contacts.${index}`}
                        required
                        type="text"
                        label={`Contact #${index + 1}`}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Styled.ArrayItem>
                  ))}
                  <FormButtonsContainer>
                    <Styled.ProjectButtons>
                      <Button type="button" text="+" onClick={() => push('')} />
                      <Button
                        type="button"
                        text="-"
                        onClick={pop}
                        color="error"
                      />
                    </Styled.ProjectButtons>
                  </FormButtonsContainer>
                </>
              )}
            />
            <FormButtonsContainer>
              <Button
                type="submit"
                text="Submit"
                disabled={!isValid || shallowEqual(initialValues, values)}
              />
            </FormButtonsContainer>
          </FormWrapper>
        )}
      </Formik>
    </Styled.Container>
  );
};

export default ResumeTab;
