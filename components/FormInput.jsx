import {
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const FormInput = ({ id, label, placeholder, register, error, prefix, suffix, maxW, helperText }) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel mb={1} mr={1}>
        {label}
      </FormLabel>
      {helperText && (
        <FormHelperText mb={2} mt={-1}>
          {helperText}
        </FormHelperText>
      )}
      <InputGroup maxWidth={maxW}>
        {prefix && <InputLeftAddon children={prefix} />}
        <Input id={id} placeholder={placeholder} focusBorderColor='green.600' {...register} shadow='sm' />
        {suffix && <InputRightAddon children={suffix} />}
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
