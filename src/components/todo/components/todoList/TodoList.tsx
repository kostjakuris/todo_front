import React from 'react';
import styles from './todo-list.module.scss';
import TodoItem from '../todoItem/TodoItem';
import { useGetAllTodosQuery } from '../../../../lib/todoApi';
import { Flex, Heading } from '@chakra-ui/react';

type TodoList = {
  id: number;
  name: string;
}

const TodoList = () => {
  const {data} = useGetAllTodosQuery('');
  
  if (data?.length > 0) {
    return (
      <Flex className={'flex-col max-w-[800px] w-full justify-center items-center'}>
        <Heading as={'h2'} className={styles.todos__header}>Todos</Heading>
        {
          data?.map((element: TodoList) => <TodoItem key={element.id} todoId={element.id} todoName={element.name} />)
        }
      </Flex>
    );
  }
  return null;
};

export default TodoList;