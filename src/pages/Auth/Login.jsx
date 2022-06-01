import {
  Container,
  Flex,
  Heading,
  Box,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { Footer } from '../../components';

const Login = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex>
        <VStack>
          <Heading fontSize="4xl">
            Share your
            <Box
              as="span"
              fontSize="5xl"
              fontFamily="'Parisienne', cursive;"
              color="#6d28d9"
              paddingX={4}
            >
              Insight
            </Box>{' '}
          </Heading>
          <Heading fontSize="4xl">Grow with the community!</Heading>
        </VStack>

        <VStack>Form</VStack>
      </Flex>
      <Footer />
    </Container>
  );
};

export { Login };
