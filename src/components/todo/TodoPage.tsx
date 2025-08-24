'use client';
import React, { useState } from 'react';
import styles from './todo-page.module.scss';
import UIInput from '../ui/uiInput/UIInput';
import { useFormik } from 'formik';
import { ListFormFields } from '../../interfaces/form.interface';
import { todoSchema } from '../validation/todoValidation';
import TodoList from './components/todoList/TodoList';
import { useCreateNewTodoMutation, useEditTodoMutation } from '../../lib/todoApi';
import { LoaderWrapper } from '../ui/loaderWrapper/LoaderWrapper';
import { Box, Button, Flex } from '@chakra-ui/react';

const TodoPage = () => {
  const [createNewTodo, {isLoading: isCreateTodoLoading}] = useCreateNewTodoMutation();
  
  const [_, {isLoading: isEditTodoLoading}] = useEditTodoMutation();
  
  const [isCreateList, setIsCreateList] = useState(false);
  
  const isLoading = isCreateTodoLoading || isEditTodoLoading;
  
  const formik = useFormik<ListFormFields>({
    initialValues: {
      listName: '',
    },
    validationSchema: todoSchema,
    onSubmit: async(values) => {
      await createNewTodo(values.listName);
      setIsCreateList(false);
    },
  });
  
  return (
    <LoaderWrapper isLoading={isLoading}>
      <Flex className={'flex-1 flex-col w-full mb-5 items-center'}>
        <Button className={styles.todo__button} onClick={() => setIsCreateList((prev) => !prev)}>
          Create todo list
        </Button>
        <form onSubmit={formik.handleSubmit} className={!isCreateList ? 'hidden' : 'block'}>
          <UIInput
            name='listName'
            placeholder='Todo name'
            type={'text'}
            value={formik.values.listName}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            isTouched={formik.touched.listName}
            error={formik.errors.listName}
          />
          <Box>
            <Button className={styles.todo__submit} type='submit'>
              Create
            </Button>
          </Box>
        </form>
        <TodoList />
      </Flex>
    </LoaderWrapper>
  );
};


export default TodoPage;