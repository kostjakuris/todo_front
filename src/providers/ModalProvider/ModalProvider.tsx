'use client';
import React, { createContext, FC, ReactNode, useCallback, useState, } from 'react';
import styles from './modal.module.scss';
import { ModalContextProps } from './ModalProvider.types';
import { Box, Flex } from '@chakra-ui/react';

export const ModalContext = createContext<
  ModalContextProps | undefined
>(undefined);

const ModalProvider: FC<{children: ReactNode}> = ({children}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  
  const openModal = useCallback(
    (content: ReactNode | FC) => {
      setModalContent(content as ReactNode);
    }, []);
  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);
  
  const modal = useCallback(
    () => (
      <Flex className={modalContent ? styles.modal : 'hidden'} onClick={() => setModalContent(null)}>
        <Box onClick={(e) => e.stopPropagation()}>
          {modalContent ? modalContent : null}
        </Box>
      </Flex>
    ),
    [modalContent, closeModal],
  );
  
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {modalContent ? modal() : null}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
