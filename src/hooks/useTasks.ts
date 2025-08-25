import { useCreateNewTaskMutation, useDeleteTaskMutation, useGetAllTasksQuery } from '../api/todoApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTasks } from '../store/slice';
import { useModal } from '../providers/ModalProvider/ModalProvider.hooks';

interface UseTasksProps {
  id: string;
}

export const useTasks = ({id}: UseTasksProps) => {
  const dispatch = useAppDispatch();
  const {taskList} = useAppSelector(state => state.todo);
  const {closeModal} = useModal();
  
  const {data: allTasksData, isLoading: isGetTaskLoading} = useGetAllTasksQuery(id);
  const [_, {isLoading: isDeleteLoading}] = useDeleteTaskMutation();
  const [createNewTask, {isLoading: isTaskLoading}] = useCreateNewTaskMutation();
  
  const onSubmitCreateTask = async(values: any) => {
    await createNewTask({
      ...values,
      priority: Number(values.priority),
      todoId: Number(id),
      position: taskList.all.length === 0 ? 1 : taskList.all.length + 1,
    });
    closeModal();
  };
  
  const sortInAscendingOrder = () => {
    const newSorted = {
      all: [...allTasksData['all']].sort((a, b) => a.priority - b.priority),
      done: [...allTasksData['done']].sort((a, b) => a.priority - b.priority),
      undone: [...allTasksData['undone']].sort((a, b) => a.priority - b.priority),
    };
    dispatch(setTasks(newSorted));
  };
  
  const sortInDescendingOrder = () => {
    const newSorted = {
      all: [...allTasksData['all']].sort((a, b) => b.priority - a.priority),
      done: [...allTasksData['done']].sort((a, b) => b.priority - a.priority),
      undone: [...allTasksData['undone']].sort((a, b) => b.priority - a.priority),
    };
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