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
