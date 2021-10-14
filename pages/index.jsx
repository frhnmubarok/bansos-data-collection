import { Container } from '@chakra-ui/layout';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <Container py={{ base: 12, md: '28' }} maxW={['container.md', 'container.lg']}>
      <Hero />
    </Container>
  );
}
