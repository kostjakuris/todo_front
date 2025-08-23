import { createListCollection } from '@chakra-ui/react';

const newTaskCategory = createListCollection({
  items: [
    {label: 'Done', value: 'done'},
    {label: 'Undone', value: 'undone'},
  ],
});

const taskPriority = createListCollection({
  items: [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'}
  ],
});

export const editTaskFields = [
  {formName: 'name', placeholder: 'New task name'},
  {formName: 'description', placeholder: 'New task description'},
  {formName: 'status', placeholder: 'Select status', select: true, collection: newTaskCategory},
  {formName: 'priority', placeholder: 'Select your priority', select: true, collection: taskPriority},
];

export const editTodoFields = [
  {formName: 'name', placeholder: 'New todo name'},
];

export const createTaskFields = [
  {formName: 'name', placeholder: 'Task name'},
  {formName: 'description', placeholder: 'Task description'},
  {formName: 'status', placeholder: 'Select status', select: true, collection: newTaskCategory},
  {formName: 'priority', placeholder: 'Select your priority', select: true, collection: taskPriority},
];

