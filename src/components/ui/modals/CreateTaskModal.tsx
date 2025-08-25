import React from 'react';
import styles from './modals.module.scss';
import { useTasks } from '../../../hooks/useTasks';
import { Box } from '@chakra-ui/react';
import FormFields from '../formFields/FormFields';
import { createTaskSchema } from '../../validation/validation';
import { createTaskFields } from '../formField/formFields';

const CreateTaskModal = ({id}: {id: string}) => {
  const {onSubmitCreateTask} = useTasks({id});
  return (
    <Box className={styles.edit}>
      <FormFields
        inputText='Create new task'
        validation={createTaskSchema}
        fields={createTaskFields}
        onFormSubmit={onSubmitCreateTask}
      />
    </Box>
  );
};

export default CreateTaskModal;