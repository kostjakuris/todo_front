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
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const {category, dragIndex, hoverIndex} = action.payload;
      const item = state.taskList[category][dragIndex];
      state.taskList[category].splice(dragIndex, 1);
      state.taskList[category].splice(hoverIndex, 0, item);
    },
    sortTasksInAscentOrder(state, action: PayloadAction<keyof TasksList>) {
      const category = action.payload;
      state.taskList[category].sort((a, b) => a.position - b.position);
    },
    sortTasksInDescentOrder(state, action: PayloadAction<keyof TasksList>) {
      const category = action.payload;
      state.taskList[category].sort((a, b) => b.position - a.position);
    }
  },
});

export const {setTasks, moveTask, setCategory, sortTasksInDescentOrder, sortTasksInAscentOrder} = tasksSlice.actions;
export default tasksSlice.reducer;
