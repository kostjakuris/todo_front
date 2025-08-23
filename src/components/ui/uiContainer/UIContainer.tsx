import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

interface UiContainerProps {
  children: React.ReactNode;
}

const UIContainer: FC<UiContainerProps> = ({children}) => {
  return (
    <Flex flex={1} direction={'column'} pb={'20px'} width={'100%'}>
      {children}
    </Flex>
  );
};

export default UIContainer;