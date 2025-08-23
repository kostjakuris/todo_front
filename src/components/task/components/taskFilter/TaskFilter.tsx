import React, { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import styles from '../../task-page.module.scss';
import UISelect, { SelectProps } from '../../../ui/uiSelect/UISelect';

interface TaskFilterProps extends Omit<SelectProps, 'class_name'> {
  filterLabel: string;
}

const TaskFilter: FC<TaskFilterProps> = ({collection, handleChange, name, placeholder,filterLabel}) => {
  return (
    <Flex mr={'20px'}>
      <Text mr={'20px'} w={'fit-content'} className={styles.task__title}>{filterLabel}</Text>
      <Box w={'100px'}>
        <UISelect
          collection={collection}
          handleChange={handleChange}
          name={name}
          placeholder={placeholder}
          class_name={'w-[100px]'}
        />
      </Box>
    </Flex>
  );
};

export default TaskFilter;