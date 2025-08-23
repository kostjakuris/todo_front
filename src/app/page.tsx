import { Metadata } from 'next';
import TodoPage from '../components/todo/TodoPage';
import UIContainer from '../components/ui/uiContainer/UIContainer';

export async function generateMetadata() {
  const metadata: Metadata = {
    title: 'Todo page',
    description: 'Page with todo list',
    keywords: 'todo',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Todo page',
      description: '',
      url: '/',
      locale: 'en_US',
      type: 'website',
      
    },
  };
  return metadata;
}

const Home = () => {
  return (
    <UIContainer>
      <TodoPage />
    </UIContainer>
  );
};

export default Home;