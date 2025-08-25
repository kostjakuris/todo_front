'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useGetAllTasksQuery } from '../api/todoApi';
import Fuse, { IFuseOptions } from 'fuse.js';
import { setSearchingTasks, setTasks, TasksList } from '../store/slice';
import { Task } from '../interfaces/form.interface';

export const useSearch = (id: string) => {
  const {category} = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();
  
  const {data: allTasksData} = useGetAllTasksQuery(id);
  const [inputValue, setInputValue] = useState('');
  
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  function doSearch(searchQuery: string) {
    if (!searchQuery.length) {
      dispatch(setTasks(allTasksData));
      
    } else {
      const res = fuseSearch.search(searchQuery);
      const faqItems = res.map((item) => item.item);
      dispatch(setSearchingTasks(faqItems));
    }
  }
  
  const fuseSearch = useMemo(() => {
    const options: IFuseOptions<Task> = {
      keys: ['name', 'description', 'status', 'priority'],
      threshold: 0.3,
    };
    return new Fuse(allTasksData?.[category as keyof TasksList], options);
  }, [allTasksData, category]);
  
  useEffect(() => {
    if (inputValue && inputValue.trim().length > 0 && allTasksData) {
      doSearch(inputValue);
    } else {
      dispatch(setTasks(allTasksData));
    }
  }, [inputValue, allTasksData]);
  
  return {
    onSearchChange,
    inputValue,
  };
};