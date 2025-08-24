'use client';
import React from 'react';
import { useAppDispatch } from '../lib/hooks';
import { setCategory } from '../lib/slice';
import { createListCollection } from '@chakra-ui/react';

export const useTaskCategory = () => {
  const dispatch = useAppDispatch();
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(event.target.value as 'all' | 'done' | 'undone'));
  };
  const taskCategory = createListCollection({
    items: [
      {label: 'All', value: 'all'},
      {label: 'Done', value: 'done'},
      {label: 'Undone', value: 'undone'},
    ],
  });
  
  return {
    handleCategoryChange,
    taskCategory,
  };
};