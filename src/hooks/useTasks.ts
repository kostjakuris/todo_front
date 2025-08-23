import { useEffect, useState } from 'react';
import { useCreateNewTaskMutation, useDeleteTaskMutation, useGetAllTasksQuery } from '../lib/todoApi';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setTasks, TasksList } from '../lib/slice';

interface UseTasksProps {
  id: string;
  setIsVisible: (value: boolean) => void;
}

export const useTasks = ({id, setIsVisible}: UseTasksProps) => {
  const dispatch = useAppDispatch();
  const {taskList, category} = useAppSelector(state => state.auth);
  const [sortedList, setSortedList] = useState<TasksList>({all: [], done: [], undone: []});
  
  const {data: allTasksData, isLoading: isGetTaskLoading} = useGetAllTasksQuery(id);
  const [_, {isLoading: isDeleteLoading}] = useDeleteTaskMutation();
  const [createNewTask, {isLoading: isTaskLoading}] = useCreateNewTaskMutation();
  
  useEffect(() => {
    if (allTasksData) {
      dispatch(setTasks(allTasksData));
      setSortedList(allTasksData);
    }
  }, [allTasksData]);
  
  const onSubmitCreateTask = async(values: any) => {
    await createNewTask({
      ...values,
      priority: Number(values.priority),
      todoId: Number(id),
      position: taskList.all.length === 0 ? 1 : taskList.all.length + 1,
    });
    setIsVisible?.(false);
  };
  
  const sortInAscendingOrder = () => {
    const newSorted = {
      ...sortedList,
      [category]: [...sortedList[category]].sort((a, b) => a.priority - b.priority),
    };
    setSortedList(newSorted);
    dispatch(setTasks(newSorted));
  };
  
  const sortInDescendingOrder = () => {
    const newSorted = {
      ...sortedList,
      [category]: [...sortedList[category]].sort((a, b) => b.priority - a.priority),
    };
    setSortedList(newSorted);
    dispatch(setTasks(newSorted));
  };
  
  const isLoading = isGetTaskLoading || isTaskLoading || isDeleteLoading;
  
  return {
    onSubmitCreateTask,
    isLoading,
    sortInAscendingOrder,
    sortInDescendingOrder,
  };
};