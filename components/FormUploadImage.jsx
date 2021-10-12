import { Input, FormControl, FormLabel, InputGroup, FormErrorMessage, InputRightElement } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useEffect, useRef } from 'react';

const FormUploadImage = ({
  name,
  placeholder,
  acceptedFileTypes,
  control,
  children,
  isRequired = false,
  imagePreview,
  register,
}) => {
  const { ref, ...rest } = register;
  const inputRef = useRef();
  const {
    field: { value, onChange, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  useEffect(() => {
    imagePreview(value);
  }, [value]);

  return (
    <>
      <FormLabel htmlFor='writeUpFile'>{children}</FormLabel>
      <InputGroup>
        <input
          type='file'
          accept={acceptedFileTypes}
          name={name}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onChange={(e) => onChange(e.target.files[0])}
          style={{ display: 'none' }}></input>
        <Input placeholder={placeholder || 'Pilih file'} onClick={() => inputRef.current.click()} value={value?.name} />
        <InputRightElement
          w='auto'
          px='2'
          bg='secondary.500'
          pointerEvents='none'
          borderRightRadius='0.375rem'
          color='white'>
          Pilih file
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </>
  );
};

export default FormUploadImage;
