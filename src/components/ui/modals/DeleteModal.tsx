'use client';
import React, { FC } from 'react';
import styles from './modals.module.scss';
import { useModal } from '../../../providers/ModalProvider/ModalProvider.hooks';
import { useDeleteTaskMutation, useDeleteTodoMutation } from '../../../api/todoApi';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface DeleteModalProps {
  id: number;
  location: 'todo' | 'task';
}

const DeleteModal: FC<DeleteModalProps> = ({id, location}) => {
  const {closeModal} = useModal();
  const [deleteTodo] = useDeleteTodoMutation();
  const [deleteTask] = useDeleteTaskMutation();
  
  const taskDeleteHandler = async() => {
    await deleteTask(id);
    closeModal();
  };
  
  const todoDeleteHandler = async() => {
    await deleteTodo(id);
    closeModal();
  };
  
  return (
    <Box className={styles.delete}>
      <Text className={styles.delete__text}>Are you sure you want to delete?</Text>
      <Flex mt={'20px'} mb={'10px'} className={'justify-around items-center'}>
        <Button className={styles.delete__cancelButton} onClick={closeModal}>Cancel</Button>
        <Button className={styles.delete__deleteButton}
          onClick={location === 'todo' ? todoDeleteHandler : taskDeleteHandler}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default DeleteModal;