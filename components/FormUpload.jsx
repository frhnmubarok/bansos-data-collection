import React, { ReactNode, useRef } from 'react';
import { useForm, UseFormRegisterReturn, useController } from 'react-hook-form';
import {
  FormLabel,
  FormHelperText,
  FormControl,
  Input,
  InputLeftAddon,
  Button,
  chakra,
  Stack,
  Icon,
  InputGroup,
  RadioGroup,
  FormErrorMessage,
  Radio,
  HStack,
  Textarea,
  useNumberInput,
  Select,
} from '@chakra-ui/react';

import { Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { FiFile } from 'react-icons/fi';

const FormUpload = (props) => {
  const { label, error, register, accept, multiple, children, helperText, icon } = props;

  const inputRef = useRef();
  const { ref, ...rest } = register;

  const handleClick = () => inputRef.current?.click();

  return (
    <>
      <Flex>
        <FormLabel mb={1}>{label}</FormLabel>
        {icon}
      </Flex>
      {helperText && (
        <FormHelperText mb={2} mt={-1}>
          {helperText}
        </FormHelperText>
      )}
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <>{children}</>
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </>
  );
};

export default FormUpload;
