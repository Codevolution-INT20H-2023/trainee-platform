import { FC } from 'react';
import { FieldArray } from 'formik';

import Button from '@/components/generic/button';
import { FormField } from '@/components/generic/form';
import * as Styled from '@/components/pages/account-page/components/resume-tab/resume-tab.styled';
import { Project } from '@/types/resume';

interface ProjectItemsProps {
  index: number;
  project: Project;
}

const ProjectItem: FC<ProjectItemsProps> = ({ index, project }) => {
  return (
    <Styled.ArrayContainer>
      <h3>Project {}</h3>
      <FormField
        required
        name={`projects.${index}.name`}
        label="Name"
        type="text"
      />
      <FormField
        required
        name={`projects.${index}.url`}
        label="URL"
        type="text"
      />
      <FormField
        required
        name={`projects.${index}.startDate`}
        label="Start of work"
        type="date"
        placeholder="date"
        InputLabelProps={{ shrink: true }}
      />
      <FormField
        required
        name={`projects.${index}.endDate`}
        label="End of work"
        placeholder="date"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <FieldArray
        name={`projects.${index}.responsibilities`}
        render={({ pop, push }) => (
          <Styled.ArrayContainer>
            {project.responsibilities.map((item, innerIndex) => (
              <Styled.ArrayItem key={innerIndex}>
                <FormField
                  name={`projects.${index}.responsibilities.${innerIndex}.responsibility`}
                  required
                  type="text"
                  label={`Responsibility #${innerIndex + 1}`}
                  InputLabelProps={{ shrink: true }}
                />
              </Styled.ArrayItem>
            ))}
            <Styled.ProjectButtons>
              <Button text="+" onClick={() => push({ responsibility: '' })} />
              <Button
                text="-"
                color="error"
                onClick={() => {
                  pop();
                }}
              />
            </Styled.ProjectButtons>
          </Styled.ArrayContainer>
        )}
      />
    </Styled.ArrayContainer>
  );
};

export default ProjectItem;
