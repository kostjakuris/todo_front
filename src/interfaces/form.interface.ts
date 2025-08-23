export interface ListFormFields {
  listName: string;
}

export interface CreateTaskFields {
  name: string;
  description: string;
  todoId: number;
  position: number;
  status: string;
  priority: number;
}

export interface Task extends CreateTaskFields {
  id: number;
}

export interface TasksList {
  undone: Task[];
  done: Task[];
  all: Task[];
}

export interface EditTodoFields {
  name: string;
  id: number;
}

export interface EditTaskFields {
  name?: string;
  description?: string;
  status?: string;
  priority?: number;
  id: number;
}


