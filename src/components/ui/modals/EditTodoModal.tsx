'use client';
import React, { FC } from 'react';
import { useModal } from '../../../providers/ModalProvider/ModalProvider.hooks';
import FormFields from '../formFields/FormFields';
import { editTodoFields } from '../formField/formFields';
import { editTodoSchema } from '../../validation/validation';
import { useEditTodoMutation } from '../../../api/todoApi';
import styles from './modals.module.scss';
import { Box } from '@chakra-ui/react';

interface EditTodoModalProps {
  id: number;
}


const EditTodoModal: FC<EditTodoModalProps> = ({id}) => {
  const {closeModal} = useModal();
  const [editTodo] = useEditTodoMutation();
  const onSubmitEditTodo = async(values: any) => {
    await editTodo({...values, id});
    closeModal();
  };
  return (
    <Box className={styles.edit}>
      <FormFields
        inputText={'Edit todo'}
        validation={editTodoSchema}
        fields={editTodoFields}
        onFormSubmit={onSubmitEditTodo}
      />
    </Box>
  );
};

export default EditTodoModal;