import { Container, Flex, Heading, Box, VStack } from '@chakra-ui/react';
import { Footer, LoginForm } from '../../components';

const Login = () => {
  return (
    <Container maxWidth="container.lg" padding={0}>
      <Flex>
        <VStack width="full">
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
        <VStack width="full">
          <LoginForm />
        </VStack>
      </Flex>
      <Footer />
    </Container>
  );
};

export { Login };
