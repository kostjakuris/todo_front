'use client';
import React, { FC, useState } from 'react';
import styles from './task-page.module.scss';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TaskCategory from './components/taskCategory/TaskCategory';
import { useTasks } from '../../hooks/useTasks';
import { LoaderWrapper } from '../ui/loaderWrapper/LoaderWrapper';
import { Box, Button, createListCollection, Flex } from '@chakra-ui/react';
import TaskFilter from './components/taskFilter/TaskFilter';
import { createTaskSchema } from '../validation/todoValidation';
import { createTaskFields } from '../ui/formField/formFields';
import ItemForm from '../ui/itemForm/ItemForm';
import { useAppDispatch } from '../../lib/hooks';
import { setCategory } from '../../lib/slice';

interface TaskListProps {
  id: string;
}


const TaskPage: FC<TaskListProps> = ({id}) => {
  const [isCreateTask, setIsCreateTask] = useState(false);
  const dispatch = useAppDispatch();
  const {onSubmitCreateTask, isLoading, sortInAscendingOrder, sortInDescendingOrder} = useTasks(
    {id, setIsVisible: setIsCreateTask});
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(event.target.value as 'all' | 'done' | 'undone'));
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'ascending') {
      sortInAscendingOrder();
    } else if (event.target.value === 'descending') {
      sortInDescendingOrder();
    }
  };
  
  const sortCategory = createListCollection({
    items: [
      {label: 'from lowest to biggest', value: 'ascending'},
      {label: 'from biggest to lowest', value: 'descending'},
    ],
  });
  
  const taskCategory = createListCollection({
    items: [
      {label: 'All', value: 'all'},
      {label: 'Done', value: 'done'},
      {label: 'Undone', value: 'undone'},
    ],
  });
  
  
  return (
    <LoaderWrapper isLoading={isLoading}>
      <Flex className='flex-col items-center justify-center'>
        <Button m={'40px 0'} className={styles.task__button} onClick={() => setIsCreateTask((prev) => !prev)}>
          Create new task
        </Button>
        <Box className={isCreateTask ? 'block' : 'hidden'}>
          <ItemForm
            inputText='Create new task'
            validation={createTaskSchema}
            fields={createTaskFields}
            onFormSubmit={onSubmitCreateTask}
            setIsVisible={setIsCreateTask}
          />
        </Box>
        <Box className='max-w-[95%] w-full mt-30'>
          <Flex ml={'auto'} mt={'30px'} justify={'flex-end'}>
            <TaskFilter
              handleChange={handleSortChange}
              name={'sort'}
              filterLabel={'Sort by priority'}
              placeholder={'Sort by'}
              collection={sortCategory}
            />
            <TaskFilter
              handleChange={handleCategoryChange}
              name={'task status'}
              filterLabel={'Status'}
              placeholder={'Status'}
              collection={taskCategory}
            />
          </Flex>
          <DndProvider backend={HTML5Backend}>
            <TaskCategory />
          </DndProvider>
        </Box>
      </Flex>
    </LoaderWrapper>
  );
};

export default TaskPage;