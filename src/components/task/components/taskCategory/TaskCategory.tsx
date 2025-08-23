import React from 'react';
import styles from '../../task-page.module.scss';
import TaskItem from '../taskItem/TaskItem';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useAppSelector } from '../../../../lib/hooks';


const TaskCategory = () => {
  const {taskList, category} = useAppSelector(state => state.auth);
  return (
    <Box w={'100%'}>
      <Heading as={'h3'} textAlign={'center'} className={styles.task__title}>{category.toUpperCase()}</Heading>
      <Flex m={'30px'} justify={'center'} flexWrap={'wrap'} gap={'30px'}>
        {taskList[category].map((task, index) => (
          <TaskItem
            key={task.id}
            id={task.id}
            index={index}
            priority={task.priority}
            name={task.name}
            status={task.status}
            description={task.description}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default TaskCategory;
