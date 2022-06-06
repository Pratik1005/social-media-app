import {
  VStack,
  Box,
  HStack,
  Button,
  Text,
  Link,
  Image,
  Flex,
} from '@chakra-ui/react';
import { defaultUser, defaultHeader } from '../asset';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const ProfileCard = () => {
  const dispatch = useDispatch();
  return (
    <VStack
      backgroundColor="#fff"
      borderRadius="2xl"
      boxShadow="xl"
      overflow="hidden"
      marginBottom={4}
    >
      <Box>
        <Image src="" fallbackSrc={defaultHeader} />
      </Box>
      <VStack width="full" alignItems="flex-start" padding={4}>
        <HStack justifyContent="space-between" width="full">
          <Box width="120px" height="120px" marginTop="-80px">
            <Image src="" fallbackSrc={defaultUser} borderRadius="full" />
          </Box>
          <Box>
            <Button variant="outline" marginRight={4}>
              Edit Profile
            </Button>
            <Button colorScheme="red" onClick={() => dispatch(userLogout())}>
              Logout
            </Button>
          </Box>
        </HStack>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text fontWeight="500" fontSize="20px">
            Jhon Doe
          </Text>
          <Text color="gray.600" marginTop={0}>
            @jhondoe
          </Text>
        </Flex>
        <Text>Frontend Developer</Text>
        <HStack>
          <Box as="span" className="material-icons">
            link
          </Box>
          <Link href="https://pratikdevle.netlify.app/" isExternal>
            https://pratikdevle.netlify.app/
          </Link>
        </HStack>
        <HStack>
          <HStack paddingRight={4}>
            <Box as="span" fontWeight="500">
              150
            </Box>
            <Text>Following</Text>
          </HStack>
          <HStack>
            <Box as="span" fontWeight="500">
              67
            </Box>
            <Text>Followers</Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export { ProfileCard };
