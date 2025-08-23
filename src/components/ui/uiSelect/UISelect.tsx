import React, { FC } from 'react';
import { ListCollection, Portal, Select } from '@chakra-ui/react';
import styles from '../itemForm/item-form.module.scss';

export interface SelectProps {
  collection?: ListCollection<{label: string, value: string}>;
  handleChange: any;
  name: string;
  placeholder: string;
  class_name?: string;
}

const UISelect: FC<SelectProps> = ({collection, handleChange, name, placeholder, class_name}) => {
  return (
    <Select.Root
      defaultValue={name === 'task status' ? ['All', 'all'] : []}
      collection={collection as ListCollection<{label: string, value: string}>}
      name={name}
      onChange={handleChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger className={`${styles.input__field} ${class_name}`}>
          <Select.ValueText className={'text-white opacity-70'} placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection?.items.map((framework) => (
              <Select.Item className={'text-black'} item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default UISelect;