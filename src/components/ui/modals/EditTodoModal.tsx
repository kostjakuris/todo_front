'use client';
import React, { FC } from 'react';
import { useModal } from '../../../providers/ModalProvider/ModalProvider.hooks';
import ItemForm from '../itemForm/ItemForm';
import { editTodoFields } from '../formField/formFields';
import { editTodoSchema } from '../../validation/todoValidation';
import { useEditTodoMutation } from '../../../lib/todoApi';
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
      <ItemForm
        inputText={'Edit todo'}
        validation={editTodoSchema}
        fields={editTodoFields}
        onFormSubmit={onSubmitEditTodo}
      />
    </Box>
  );
};

export default EditTodoModal;