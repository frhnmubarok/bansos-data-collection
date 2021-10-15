import Link from 'next/link';
import { Button, ButtonGroup } from '@chakra-ui/react';

import { Flex, Heading, Text, VStack } from '@chakra-ui/layout';

const index = () => {
  return (
    <Flex py={8} px={4} mx={'auto'} justifyContent='center' alignItems='center' h='100%'>
      <Flex alignItems='center' justifyContent='center' direction='column'>
        <img
          src='http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-1.png'
          alt=''
        />
        <VStack w='full'>
          <Heading fontWeight='semibold'>
            <Text>Berhasil !</Text>
          </Heading>
          <Text color={'gray.500'}>Data warga berhasil ditambah</Text>
          <Flex justify='center'>
            <ButtonGroup spacing='4' colorScheme='green' mt={4}>
              <Link href='/form'>
                <Button shadow='base'>Tambah data</Button>
              </Link>
              <Link href='/'>
                <Button variant='outline' shadow='base'>
                  Halaman utama
                </Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default index;
