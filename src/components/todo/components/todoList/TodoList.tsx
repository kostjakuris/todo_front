import React from 'react';
import styles from './todo-list.module.scss';
import todoStyles from '../todoItem/todo-item.module.scss';
import TodoItem from '../todoItem/TodoItem';
import { useGetAllTodosQuery } from '../../../../lib/todoApi';
import { Flex, Heading } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import AnimationWrapper from '../../../ui/animationWrapper/AnimationWrapper';

type TodoList = {
  id: number;
  name: string;
}

const TodoList = () => {
  const {data} = useGetAllTodosQuery('');
  
  if (data?.length > 0) {
    return (
      <Flex className={'flex-col max-w-[800px] w-full justify-center items-center'}>
        {
          data?.length > 0 ?
            <Heading as={'h2'} className={styles.todos__header}>Todos</Heading>
            : null
        }
        <AnimatePresence>
          {
            data?.length > 0 ?
              data?.map((element: TodoList) =>
                <AnimationWrapper key={element.id} class_name={todoStyles.todo}>
                  <TodoItem key={element.id} todoId={element.id} todoName={element.name} />
                </AnimationWrapper>
              )
              :
              <Heading
                as={'h4'}
                textAlign={'center'}
                mt={'20px'}
                className={styles.todos__header}>
                There are no todos yet!
              </Heading>
          }
        </AnimatePresence>
      </Flex>
    );
  }
  return null;
};

export default TodoList;