import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react';
const FormTitle = () => {
  return (
    <Box mb='8px'>
      <Heading fontSize={{ base: '26px', lg: '4xl' }} mb='8px'>
        <Text as={'span'} color={'gray.800'}>
          Tambah Data Warga
        </Text>
      </Heading>
      <Text color={'gray.600'} fontSize='16px'>
        Silahkan isi formulir dibawah.
      </Text>
    </Box>
  );
};

export default FormTitle;
