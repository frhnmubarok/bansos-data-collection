import { Stack, Box, Heading, Text, Button, Image, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const Hero = () => {
  return (
    <Stack align={{ base: 'center', lg: 'start' }} spacing={{ base: 4, md: 4 }}>
      <Flex direction={['column', 'row']} align='center'>
        <Box>
          <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '5%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.600',
                zIndex: -1,
              }}>
              Panghegar
            </Text>
            <br />
            <Text as={'span'} color={'green.600'}>
              Bansos App
            </Text>
          </Heading>
          <Text color={'gray.600'} mt={4}>
            Aplikasi yang memudahkan Ketua RW di Komplek Panghegar dalam menginput data warga yang membutuhkan bantuan
            sosial.
          </Text>
        </Box>
        <Image alt={'Hero Image'} align={'center'} width={'100%'} height={'100%'} src='/hero.jpg' />
      </Flex>

      <Stack>
        <Link href='/form'>
          <Button
            rounded='lg'
            size={'md'}
            shadow='lg'
            fontWeight={'normal'}
            colorScheme={'green'}
            bg={'green.600'}
            _hover={{ bg: 'green.700' }}>
            Tambah data
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Hero;
