import React, { FC } from 'react';
import styles from './todo-item.module.scss';
import { Edit } from '../../../../../public/images/Edit';
import { Delete } from '../../../../../public/images/Delete';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../../providers/ModalProvider/ModalProvider.hooks';
import DeleteModal from '../../../ui/modals/DeleteModal';
import EditTodoModal from '../../../ui/modals/EditTodoModal';

interface TodoItemProps {
  todoId: number;
  todoName: string;
}

const TodoItem: FC<TodoItemProps> = ({todoId, todoName}) => {
  const router = useRouter();
  const {openModal} = useModal();
  
  return (
    <Flex justify={'center'} alignItems={'center'} className={styles.todo}>
      <Flex p={'20px'} className={'justify-between items-center max-w-[600px] w-full rounded-[15px]'}>
        <Heading as={'h4'} className={styles.todo__title}>{todoName}</Heading>
        <Flex className={'justify-between items-center h-[40px]'}>
          <Button backgroundColor={'transparent'} h={'30px'} onClick={() => openModal(
            <EditTodoModal id={todoId} />
          )}>
            <Edit />
          </Button>
          <Button backgroundColor={'transparent'} h={'30px'} mr={'5px'} onClick={() => openModal(
            <DeleteModal id={todoId} location={'todo'} />
          )}>
            <Delete class_name={'w-full h-full'} />
          </Button>
          <Button onClick={() => router.push(`/todo/${todoId}`)}
            className={`${styles.todo__button} text-center pt-[3px]`}>
            All tasks
          </Button>
        </Flex>
      </Flex>
    </Flex>
  
  );
};

export default TodoItem;