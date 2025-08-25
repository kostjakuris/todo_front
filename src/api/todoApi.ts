import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateTaskFields, EditTaskFields, EditTodoFields } from '../interfaces/form.interface';

export const todoApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  tagTypes: ['User', 'Todo', 'Task'],
  endpoints: (build) => ({
    getAllTodos: build.query({
      query: () => ({
        url: '/todo/all',
      }),
      providesTags: ['User', 'Todo']
    }),
    getAllTasks: build.query({
      query: (id: string) => ({
        url: `/task/all?id=${id}`,
      }),
      providesTags: ['User', 'Task']
    }),
    createNewTodo: build.mutation({
      query: (name: string) => ({
        url: `/todo/create`,
        method: 'POST',
        body: {name}
      }),
      invalidatesTags: ['Todo']
    }),
    createNewTask: build.mutation({
      query: ({name, description, position, todoId, priority, status}: CreateTaskFields) => ({
        url: `/task/create`,
        method: 'POST',
        body: {name, description, position, id: todoId, priority, status}
      }),
      invalidatesTags: ['Task']
    }),
    deleteTodo: build.mutation({
      query: (id: number) => ({
        url: `/todo/delete`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: ['Todo']
    }),
    editTodo: build.mutation({
      query: ({id, name}: EditTodoFields) => ({
        url: `/todo/edit`,
        method: 'PATCH',
        body: {id, name}
      }),
      invalidatesTags: ['Todo']
    }),
    editTask: build.mutation({
      query: ({id, name, description, status, priority}: EditTaskFields) => ({
        url: `/task/edit`,
        method: 'PATCH',
        body: {id, name, description, status, priority}
      }),
      invalidatesTags: ['Task']
    }),
    editTaskPosition: build.mutation({
      query: (list: any) => ({
        url: `/task/edit-position`,
        method: 'PATCH',
        body: list
      }),
      invalidatesTags: ['Task']
    }),
    deleteTask: build.mutation({
      query: (id: number) => ({
        url: `/task/delete`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: ['Task']
    }),
  })
});
export const {
  useGetAllTodosQuery,
  useGetAllTasksQuery,
  useCreateNewTodoMutation,
  useCreateNewTaskMutation,
  useDeleteTodoMutation,
  useDeleteTaskMutation,
  useEditTodoMutation,
  useEditTaskMutation,
  useEditTaskPositionMutation
} = todoApi;