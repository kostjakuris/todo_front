import React from 'react';
import TaskPage from '../../../components/task/TaskPage';
import UIContainer from '../../../components/ui/uiContainer/UIContainer';

interface TodoPageProps {
  params: Promise<{todoId: string}>;
}

const TodoPage = async({params}: TodoPageProps) => {
  const {todoId} = await params;
  return (
    <UIContainer>
      <TaskPage id={todoId} />
    </UIContainer>
  );
};

export default TodoPage;