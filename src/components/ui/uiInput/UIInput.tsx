import React, { FC } from 'react';
import styles from './input.module.scss';
import { Box, Input } from '@chakra-ui/react';

interface InputProps {
  name: string;
  placeholder?: string;
  type: string;
  value: string;
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurFn?: (e: React.FocusEvent<any>) => void;
  class_name?: string;
  isTouched?: boolean | undefined;
  error?: string | undefined;
}

const UIInput: FC<InputProps> = ({
  name,
  placeholder,
  type,
  value,
  onChangeFn,
  onBlurFn,
  isTouched,
  class_name,
  error
}) => {
  return (
    <>
      <Input
        className={class_name ? class_name : styles.input__field}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChangeFn}
        onBlur={onBlurFn}
      />
      <Box
        className={`${styles.input__unverified_text} ${isTouched && error
          ? styles.input__open
          : styles.input__close},
        `}
      >
        {error}
      </Box>
    </>
  );
};

export default UIInput;