import React, { useRef } from 'react';
import {
  FormLabel,
  FormHelperText,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Flex} from '@chakra-ui/layout';
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
