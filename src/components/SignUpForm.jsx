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

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: '',
    fullName: '',
    userName: '',
    password: '',
  });

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
      <Heading size="xl">Sign up</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter email" />
      </FormControl>
      <FormControl>
        <FormLabel>Full name</FormLabel>
        <Input placeholder="Enter full name" />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Enter username" />
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
        Sign up
      </Button>
      <Text>
        Have an account?{' '}
        <Link as={NavLink} to="/login">
          Login
        </Link>
      </Text>
    </VStack>
  );
};

export { SignUpForm };
