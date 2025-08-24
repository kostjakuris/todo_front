import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Button, Flex, Heading } from '@chakra-ui/react';
import styles from './item-form.module.scss';
import FormField from '../formField/FormField';
import { useModal } from '../../../providers/ModalProvider/ModalProvider.hooks';

interface TodoInputProps {
  fields: Array<{formName: string; placeholder: string; select?: boolean; collection?: any}>;
  validation?: any;
  onFormSubmit: (values: any) => void;
  inputText: string;
}

const ItemForm: FC<TodoInputProps> = ({fields, validation, onFormSubmit, inputText}) => {
  const {closeModal} = useModal();
  
  const initialValues = fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.formName] = '';
    return acc;
  }, {});
  
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: onFormSubmit,
  });
  
  return (
    <Flex className={'flex-col items-center justify-center mt-10 pb-10'}>
      <Heading as={'h2'} mb={'20px'} className={styles.input__title}>{inputText}</Heading>
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.formName}
            field={field}
            value={formik.values[field.formName]}
            error={formik.errors[field.formName] as string}
            touched={formik.touched[field.formName]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        ))}
        <Flex mb={'20px'} className={'items-center justify-between'}>
          <Button w={'190px'} className={styles.input__cancel} type='reset' onClick={() => {
            closeModal();
          }}>
            Cancel
          </Button>
          <Button w={'190px'} className={styles.input__submit} type='submit'>Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ItemForm;
