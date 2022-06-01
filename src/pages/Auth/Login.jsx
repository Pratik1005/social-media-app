import {
  Container,
  Flex,
  Heading,
  Box,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';

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
      <VStack as="footer">
        <Text>Made by Pratik Devle</Text>
        <Box display="flex">
          <Link href="https://github.com/Pratik1005" isExternal>
            <Box as="i" className="fab fa-github"></Box>
          </Link>
          <Link
            href="https://www.linkedin.com/in/pratik-devle-296184160"
            isExternal
          >
            <Box as="i" className="fab fa-linkedin-in"></Box>
          </Link>
          <Link href="https://twitter.com/DevlePratik" isExternal>
            <Box as="i" className="fab fa-twitter"></Box>
          </Link>
        </Box>
        <Text fontSize="14px">© {new Date().getFullYear()} Insight</Text>
      </VStack>
    </Container>
  );
};

export { Login };
