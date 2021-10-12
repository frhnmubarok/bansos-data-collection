import React, { ReactNode, useRef } from 'react';
import { useForm, UseFormRegisterReturn, useController } from 'react-hook-form';
import {
  FormLabel,
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
  const { label, error, register, accept, multiple, children, imagePreview } = props;
  const inputRef = useRef();
  const { ref, ...rest } = register;

  const handleClick = () => inputRef.current?.click();

  return (
    <>
      <FormLabel mb={1}>{label}</FormLabel>
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          onChange={(event) => {
            const img = event.target.files[0];
            console.log(img);
            imagePreview(URL.createObjectURL(img));
          }}
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
