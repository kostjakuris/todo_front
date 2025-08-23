import React, { FC } from 'react';
import styles from './modals.module.scss';
import { Box } from '@chakra-ui/react';
import { editTaskFields } from '../formField/formFields';
import ItemForm from '../itemForm/ItemForm';
import { useEditTaskMutation } from '../../../lib/todoApi';
import { useModal } from '../../../providers/ModalProvider/ModalProvider.hooks';

interface EditTaskModalProps {
  id: number;
}


const EditTaskModal: FC<EditTaskModalProps> = ({id}) => {
  const [editTask] = useEditTaskMutation();
  
  const {closeModal} = useModal();
  
  const onSubmitEditTask = async(values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== '' && value !== undefined && value !== null)
    );
    
    await editTask({
      ...filteredValues,
      id,
      ...(filteredValues.priority ? {priority: Number(filteredValues.priority)} : {})
    });
    closeModal();
  };
  return (
    <Box className={styles.edit}>
      <ItemForm
        inputText='Edit task'
        fields={editTaskFields}
        onFormSubmit={onSubmitEditTask}
      />
    </Box>
  );
};

export default EditTaskModal;