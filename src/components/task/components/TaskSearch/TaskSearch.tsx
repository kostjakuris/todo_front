'use client';
import React, { ChangeEvent, FC, useState } from 'react';

import styles from './task-search.module.scss';
import Search from '../../../../../public/images/Search';
import { Box, Icon, Input } from '@chakra-ui/react';
import SearchGradient from '../../../../../public/images/SearchGradient';

interface FaqSearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TaskSearch: FC<FaqSearchProps> = ({value, onChange}) => {
  const [isFucused, setIsFucused] = useState(false);
  
  return (
    <Box className={styles.search}>
      <Box>
        <Input
          onChange={onChange}
          onFocus={() => setIsFucused(true)}
          onBlur={() => setIsFucused(false)}
          type='text'
          value={value}
          placeholder='Type a task name'
        />
        <Icon>
          {
            isFucused ?
              <SearchGradient class_name={styles.search__icon} /> :
              <Search class_name={styles.search__icon} />
            
          }
        </Icon>
      </Box>
    </Box>
  );
};

export default TaskSearch;
