'use client';
import React, { FC } from 'react';
import styles from '../../task-page.module.scss';
import { Edit } from '../../../../../public/images/Edit';
import { Delete } from '../../../../../public/images/Delete';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useModal } from '../../../../providers/ModalProvider/ModalProvider.hooks';
import EditTaskModal from '../../../ui/modals/EditTaskModal';
import DeleteModal from '../../../ui/modals/DeleteModal';
import { useTaskDragAndDrop } from '../../../../hooks/useTasksDragAndDrop';

interface TaskItemProps {
  id: number;
  index: number;
  name: string;
  status: string;
  priority: number;
  description: string;
}

const TaskItem: FC<TaskItemProps> = ({
  id,
  name,
  index,
  status,
  description,
  priority,
}) => {
  const {openModal} = useModal();
  const {ref, handlerId, opacity, changeTaskPosition} = useTaskDragAndDrop(
    id,
    index,
    status,
  );
  
  return (
    <>
      {
        <Box
          className={styles.task__container}
          ref={ref}
          style={{opacity}} data-handler-id={handlerId}
          onDragEndCapture={async() => await changeTaskPosition()}
        >
          <Flex className={'items-center justify-between p-[20px] w-full'}>
            <Heading as={'h4'} className={`${styles.task__title} mr-5`}>{name}</Heading>
            <Flex className={'items-center justify-between h-[40px]'}>
              <Button backgroundColor={'black'} h={'20px'} outline={'none'}
                onClick={() => openModal(
                  <EditTaskModal id={id} />
                )}>
                <Edit />
              </Button>
              <Button backgroundColor={'black'} h={'20px'} outline={'none'}
                onClick={() => openModal(
                  <DeleteModal id={id} location={'task'} />
                )}>
                <Delete />
              </Button>
            </Flex>
          </Flex>
          <Text m={'10px 0'} className={styles.task__text}>Status: {status}</Text>
          <Text m={'10px 0'} className={styles.task__text}>Priority: {priority}</Text>
          <Text className={`${styles.task__text} text-left w-full px-5 mb-8`}>Description: {description}</Text>
        </Box>
      }
    </>
  );
};

export default TaskItem;