import React from 'react';
import TaskPage from '../../../components/task/TaskPage';
import UIContainer from '../../../components/ui/uiContainer/UIContainer';

const TodoPage = async({params}: {params: {todoId: string}}) => {
  const {todoId} = await params;
  return (
    <UIContainer>
      <TaskPage id={todoId} />
    </UIContainer>
  );
};

export default TodoPage;