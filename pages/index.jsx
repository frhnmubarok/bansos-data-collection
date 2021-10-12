import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/Hero';
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container py={{ base: 12, md: '28' }} maxW={['container.md', 'container.lg']}>
      <Hero />
    </Container>
  );
}
