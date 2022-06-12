import { VStack, HStack, Text, Box, Flex, Avatar } from '@chakra-ui/react';
import { formatDate } from '../utils/utils';
import { NavLink } from 'react-router-dom';

const PostCard = ({ postData }) => {
  const {
    uid,
    name,
    username,
    photoURL,
    postText,
    likes,
    comments,
    uploadDate,
  } = postData;
  const formattedDate = formatDate(uploadDate);
  return (
    <VStack
      spacing={4}
      backgroundColor="#fff"
      borderRadius="2xl"
      padding={4}
      align="flex-start"
      width="full"
    >
      <HStack>
        <Box as={NavLink} to={`/user/${uid}`}>
          <Avatar name={name} src={photoURL} />
        </Box>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text as="span" fontWeight="500">
            {name}
          </Text>
          <HStack>
            <Text as="span" color="gray.600" marginTop={0}>
              {`@${username}`}
            </Text>
            <Text as="span" fontWeight="500">
              ·
            </Text>
            <Text as="span" fontSize="14px">
              {formattedDate}
            </Text>
          </HStack>
        </Flex>
      </HStack>
      <Text>{postText}</Text>
      <HStack justify="space-between" width="full">
        <HStack cursor="pointer">
          <Box
            as="span"
            className="material-icons-outlined"
            color="gray.600"
            fontSize="18px"
            cursor="pointer"
          >
            mode_comment
          </Box>
          <Box as="span" fontSize="14px">
            {comments.length}
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color="gray.600"
          fontSize="18px"
          cursor="pointer"
        >
          share
        </Box>
        <HStack cursor="pointer">
          <Box
            as="span"
            className="material-icons-outlined"
            color="gray.600"
            fontSize="18px"
          >
            favorite_border
          </Box>
          <Box as="span" fontSize="14px">
            {likes}
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color="gray.600"
          fontSize="18px"
          cursor="pointer"
        >
          bookmark_border
        </Box>
      </HStack>
    </VStack>
  );
};

export { PostCard };
