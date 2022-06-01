import {
  VStack,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Input,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  Box,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <VStack
      width="full"
      spacing={5}
      padding={8}
      backgroundColor="#fff"
      borderRadius="xl"
      boxShadow="lg"
    >
      <Heading size="xl">Login</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            paddingRight="2rem"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="2rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleShowPassword}
              paddingX={4}
              height="full"
              variant="ghost"
            >
              <Box as="span" className="material-icons" fontSize="20px">
                {showPassword ? 'visibility_off' : 'visibility'}
              </Box>
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width="full"
        backgroundColor="#6d28d9"
        color="#fff"
        _hover={{ backgroundColor: '#6d28d9' }}
      >
        Login
      </Button>
      <Button width="full">Guest Login</Button>
      <Text>
        Don't have an account?{' '}
        <Link as={NavLink} to="/signup">
          Sign up
        </Link>
      </Text>
    </VStack>
  );
};

export { LoginForm };
