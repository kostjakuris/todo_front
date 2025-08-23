'use client';
import { FadeLoader } from 'react-spinners';
import { Flex } from '@chakra-ui/react';

export const LoaderWrapper = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <Flex className={'flex-1 flex-col w-full justify-center items-center'}>
        <FadeLoader color='white' />
      </Flex>
    );
  }
  return <>{children}</>;
};