import {
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const FormInput = ({ id, label, placeholder, register, error, suffix, helperText }) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel mb={1}>{label}</FormLabel>
      {helperText && (
        <FormHelperText mb={2} mt={-1}>
          {helperText}
        </FormHelperText>
      )}
      <InputGroup>
        {suffix && <InputLeftAddon children={suffix} />}
        <Input id={id} placeholder={placeholder} focusBorderColor='green.600' {...register} />
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
