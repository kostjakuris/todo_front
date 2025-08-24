'use client';
import React, { FC } from 'react';
import styles from './task-page.module.scss';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TaskList from './components/taskList/TaskList';
import { useTasks } from '../../hooks/useTasks';
import { LoaderWrapper } from '../ui/loaderWrapper/LoaderWrapper';
import { Box, Button, createListCollection, Flex } from '@chakra-ui/react';
import TaskFilter from './components/taskFilter/TaskFilter';
import TaskSearch from './components/TaskSearch/TaskSearch';
import { useSearch } from '../../hooks/useSearch';
import { useTaskCategory } from '../../hooks/useTaskCategory';
import { useModal } from '../../providers/ModalProvider/ModalProvider.hooks';
import CreateTaskModal from '../ui/modals/CreateTaskModal';

interface TaskListProps {
  id: string;
}

const TaskPage: FC<TaskListProps> = ({id}) => {
  const {isLoading, sortInAscendingOrder, sortInDescendingOrder} = useTasks(
    {id});
  const {openModal} = useModal();
  
  const {inputValue, onSearchChange} = useSearch(id);
  const {handleCategoryChange, taskCategory} = useTaskCategory();
  
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
  
  return (
    <LoaderWrapper isLoading={isLoading}>
      <Flex className='flex-col items-center justify-center'>
        <Button m={'40px 0'} className={styles.task__button} onClick={() => openModal(
          <CreateTaskModal id={id} />
        )}>
          Create new task
        </Button>
        <TaskSearch value={inputValue} onChange={onSearchChange} />
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
            <TaskList />
          </DndProvider>
        </Box>
      </Flex>
    </LoaderWrapper>
  );
};

export default TaskPage;