import { FC, Key } from 'react';
import { FieldArray } from 'formik';
import Link from 'next/link';

import Button from '@/components/generic/button';
import { FormButtonsContainer, FormField } from '@/components/generic/form';
import * as Styled from '@/components/pages/account-page/components/resume-tab/resume-tab.styled';

interface ProjectItemsProps {
  index: number;
  project: any;
}

const ProjectSiteItem: FC<ProjectItemsProps> = ({ index, project }) => {
  return (
    <Styled.ArrayContainer>
      <h3>Project {project.name}</h3>
      <h4>{project.description}</h4>
      <FormButtonsContainer>
        <Styled.ArrayContainer>
          <h4>
            Start date:
            <span>
              {project.startDate.substring(0, project.startDate.indexOf('T'))}
            </span>
          </h4>
          <h4>
            <span>
              {project.endDate.substring(0, project.endDate.indexOf('T'))}
            </span>
          </h4>
        </Styled.ArrayContainer>
      </FormButtonsContainer>
      <Link href={project.displayUrl}>Link to project</Link>
      <FieldArray
        name={`projects.${index}.responsibilities`}
        render={({ pop, push }) => (
          <Styled.ArrayContainer>
            {project.responsibilities.map((item: any, innerIndex: number) => (
              <Styled.ArrayItem key={innerIndex}>
                <FormField
                  name={`projects.${index}.userProjects.${innerIndex}`}
                  required
                  type="text"
                  label={`Responsibility #${innerIndex + 1}`}
                  InputLabelProps={{ shrink: true }}
                />
              </Styled.ArrayItem>
            ))}
            <Styled.ProjectButtons>
              <Button text="+" onClick={() => push('')} />
              <Button text="-" color="error" onClick={pop} />
            </Styled.ProjectButtons>
          </Styled.ArrayContainer>
        )}
      />
    </Styled.ArrayContainer>
  );
};

export default ProjectSiteItem;
