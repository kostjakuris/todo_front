import React from 'react';
import styles from '../../task-page.module.scss';
import TaskItem from '../taskItem/TaskItem';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useAppSelector } from '../../../../store/hooks';
import { AnimatePresence } from 'framer-motion';
import AnimationWrapper from '../../../ui/animationWrapper/AnimationWrapper';

const TaskList = () => {
  const {taskList, category} = useAppSelector(state => state.todo);
  return (
    <Box w={'100%'}>
      <Heading as={'h3'} textAlign={'center'} className={styles.task__title}>{category.toUpperCase()}</Heading>
      <Flex m={'30px'} justify={'center'} flexWrap={'wrap'} gap={'30px'}>
        <AnimatePresence>
          {taskList?.[category].length > 0 ? taskList?.[category].map((task, index) => (
              <AnimationWrapper key={task.id}
                class_name={'max-w-[500px] w-full'}>
                <TaskItem
                  key={task.id}
                  id={task.id}
                  index={index}
                  priority={task.priority}
                  name={task.name}
                  status={task.status}
                  description={task.description}
                />
              </AnimationWrapper>
            )) :
            <Heading
              as={'h4'}
              textAlign={'center'}
              mt={'20px'}
              className={styles.task__title}>
              There are no tasks yet!
            </Heading>
          }
        </AnimatePresence>
      </Flex>
    </Box>
  );
};

export default TaskList;
