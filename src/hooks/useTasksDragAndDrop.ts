'use client';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveTask } from '../store/slice';
import { useEditTaskPositionMutation } from '../api/todoApi';

export const ItemTypes = {
  TASK: 'task',
};

interface DragItem {
  id: number;
  index: number;
  status: string;
}

export const useTaskDragAndDrop = (
  id: number,
  index: number,
  status: string,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [editTaskPosition] = useEditTaskPositionMutation();
  const {taskList, category} = useAppSelector(state => state.todo);
  
  const [{handlerId}, drop] = useDrop<DragItem, void, {handlerId: Identifier | null}>({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      
      dispatch(moveTask({category, dragIndex, hoverIndex}));
      
      item.index = hoverIndex;
    },
  });
  
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.TASK,
    item: {id, index, status, category},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  drag(drop(ref));
  
  const opacity = isDragging ? 0.3 : 1;
  
  const changeTaskPosition = async() => {
    await editTaskPosition({
      list: taskList[category],
    });
  };
  
  return {
    ref,
    handlerId,
    opacity,
    changeTaskPosition,
  };
};
