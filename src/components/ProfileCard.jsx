import {
  VStack,
  Box,
  HStack,
  Button,
  Text,
  Link,
  Image,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { defaultHeader } from '../asset';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { ProfileCta } from './index';

const ProfileCard = ({ userData }) => {
  const dispatch = useDispatch();
  const {
    uid,
    name,
    username,
    photoURL,
    headerImage,
    followers,
    following,
    bio,
    website,
  } = userData;

  return (
    <VStack
      backgroundColor="#fff"
      borderRadius="2xl"
      boxShadow="xl"
      overflow="hidden"
      marginBottom={4}
    >
      <Box>
        <Image src={headerImage} fallbackSrc={defaultHeader} />
      </Box>
      <VStack width="full" alignItems="flex-start" padding={4}>
        <HStack justifyContent="space-between" width="full">
          <Box width="120px" height="120px" marginTop="-80px">
            <Avatar src={photoURL} name={name} size="2xl" />
          </Box>
          <Box>
            <ProfileCta followUserData={{ uid, name, username, photoURL }} />
          </Box>
        </HStack>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text fontWeight="500" fontSize="20px">
            {name}
          </Text>
          <Text color="gray.600" marginTop={0}>
            {`@${username}`}
          </Text>
        </Flex>
        {bio && <Text>{bio}</Text>}
        {website && (
          <HStack>
            <Box as="span" className="material-icons">
              link
            </Box>
            <Link href={website} isExternal>
              {website}
            </Link>
          </HStack>
        )}
        <HStack>
          <HStack paddingRight={4}>
            <Box as="span" fontWeight="500">
              {following.length}
            </Box>
            <Text>Following</Text>
          </HStack>
          <HStack>
            <Box as="span" fontWeight="500">
              {followers.length}
            </Box>
            <Text>Followers</Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export { ProfileCard };
