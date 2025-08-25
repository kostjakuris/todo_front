import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../interfaces/form.interface';

export interface TasksList {
  undone: Task[];
  done: Task[];
  all: Task[];
}

interface MoveTaskPayload {
  category: keyof TasksList;
  dragIndex: number;
  hoverIndex: number;
}

interface InitialState {
  taskList: TasksList;
  category: keyof TasksList;
}

const initialState: InitialState = {
  taskList: {
    undone: [],
    done: [],
    all: [],
  },
  category: 'all'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TasksList>) {
      state.taskList = action.payload;
    },
    setCategory(state, action: PayloadAction<keyof TasksList>) {
      state.category = action.payload;
    },
    setSearchingTasks(state, action) {
      state.taskList.all = action.payload;
      state.taskList.done = action.payload.filter((task: Task) => task.status === 'done');
      state.taskList.undone = action.payload.filter((task: Task) => task.status === 'undone');
    },
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const {category, dragIndex, hoverIndex} = action.payload;
      const item = state.taskList[category][dragIndex];
      state.taskList[category].splice(dragIndex, 1);
      state.taskList[category].splice(hoverIndex, 0, item);
    },
  },
});

export const {setTasks, moveTask, setCategory, setSearchingTasks} = tasksSlice.actions;
export default tasksSlice.reducer;
