import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import UIInput from '../uiInput/UIInput';
import UISelect from '../uiSelect/UISelect';

interface FormFieldProps {
  field: {
    formName: string;
    placeholder: string;
    select?: boolean;
    collection?: any;
  };
  value: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const FormField: FC<FormFieldProps> = ({field, value, error, touched, onChange, onBlur}) => {
  if (field.select) {
    return (
      <Flex mb={'25px'} className={'flex-col items-center'}>
        <UISelect
          collection={field.collection}
          handleChange={onChange}
          name={field.formName}
          placeholder={field.placeholder}
        />
      </Flex>
    );
  }
  
  return (
    <Box mb={'10px'}>
      <UIInput
        name={field.formName}
        type='text'
        placeholder={field.placeholder}
        value={value}
        onChangeFn={onChange}
        onBlurFn={onBlur}
        isTouched={touched}
        error={error}
      />
    </Box>
  );
};

export default FormField;
