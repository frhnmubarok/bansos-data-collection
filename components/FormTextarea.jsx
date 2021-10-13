import { FormLabel, FormControl, FormErrorMessage, Textarea } from '@chakra-ui/react';

const FormTextarea = ({ id, label, placeholder, register, error }) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel mb={1}>{label}</FormLabel>
      <Textarea placeholder={placeholder} id={id} shadow='sm' focusBorderColor='green.600' {...register} />
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextarea;
