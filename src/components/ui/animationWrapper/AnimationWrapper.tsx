import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface AnimationWrapperProps {
  children: React.ReactNode;
  class_name: string;
}

const AnimationWrapper: FC<AnimationWrapperProps> = ({children, class_name}) => {
  return (
    <motion.div
      className={class_name}
      layout
      initial={{opacity: 0, maxHeight: 0}}
      animate={{opacity: 1, maxHeight: 400}}
      exit={{opacity: 0, maxHeight: 0}}
      transition={{
        maxHeight: {duration: 0.3, ease: 'easeInOut'},
        opacity: {duration: 0.3, ease: 'easeInOut'},
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;