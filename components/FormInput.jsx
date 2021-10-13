import {
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  FormErrorMessage,
  FormHelperText,
  Flex,
} from '@chakra-ui/react';

const FormInput = ({ id, label, placeholder, register, error, prefix, suffix, maxW, helperText, icon }) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <Flex alignItems='center'>
        <FormLabel mb={1} mr={1}>
          {label}
        </FormLabel>
        {icon}
      </Flex>
      {helperText && (
        <FormHelperText mb={2} mt={-1}>
          {helperText}
        </FormHelperText>
      )}
      <InputGroup maxWidth={maxW}>
        {prefix && <InputLeftAddon children={prefix} />}
        <Input id={id} placeholder={placeholder} focusBorderColor='green.600' {...register} />
        {suffix && <InputRightAddon children={suffix} />}
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
