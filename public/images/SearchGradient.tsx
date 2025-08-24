import React, { FC } from 'react';
import { ImageProps } from '../../src/interfaces/image.interface';

const SearchGradient: FC<ImageProps> = ({class_name}) => {
  return (
    <svg className={class_name} width='24' height='25' viewBox='0 0 24 25' fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.5 22.2344C5.85 22.2344 1.25 17.6344 1.25 11.9844C1.25 6.33437 5.85 1.73438 11.5 1.73438C17.15 1.73438 21.75 6.33437 21.75 11.9844C21.75 17.6344 17.15 22.2344 11.5 22.2344ZM11.5 3.23438C6.67 3.23438 2.75 7.16437 2.75 11.9844C2.75 16.8044 6.67 20.7344 11.5 20.7344C16.33 20.7344 20.25 16.8044 20.25 11.9844C20.25 7.16437 16.33 3.23438 11.5 3.23438Z'
        fill='url(#paint0_linear_1944_1728)' />
      <path
        d='M21.9999 23.2358C21.8099 23.2358 21.6199 23.1658 21.4699 23.0158L19.4699 21.0158C19.1799 20.7258 19.1799 20.2458 19.4699 19.9558C19.7599 19.6658 20.2399 19.6658 20.5299 19.9558L22.5299 21.9558C22.8199 22.2458 22.8199 22.7258 22.5299 23.0158C22.3799 23.1658 22.1899 23.2358 21.9999 23.2358Z'
        fill='url(#paint1_linear_1944_1728)' />
      <defs>
        <linearGradient id='paint0_linear_1944_1728' x1='1.25' y1='11.9844' x2='21.75' y2='11.9844'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#9890E3' />
          <stop offset='1' stopColor='#B1F4CF' />
        </linearGradient>
        <linearGradient id='paint1_linear_1944_1728' x1='19.2524' y1='21.487' x2='22.7474' y2='21.487'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#9890E3' />
          <stop offset='1' stopColor='#B1F4CF' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SearchGradient;