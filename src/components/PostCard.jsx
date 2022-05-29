import { VStack, HStack, Image, Text, Box, Flex } from '@chakra-ui/react';
import profile_pic from '../asset/profile_pic.jpg';

const PostCard = ({ isBookmark }) => {
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
        <Image
          boxSize="48px"
          borderRadius="full"
          src={profile_pic}
          alt="user"
        />
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text as="span" fontWeight="500">
            Jhon Doe
          </Text>
          <HStack>
            <Text as="span" color="gray.600" marginTop={0}>
              @jhondoe
            </Text>
            <Text as="span" fontWeight="500">
              ·
            </Text>
            <Text as="span" fontSize="14px">
              May 29, 2022
            </Text>
          </HStack>
        </Flex>
      </HStack>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. A similique
        maiores, aperiam doloribus voluptates nisi ratione nemo cupiditate in
        non nulla praesentium culpa modi veniam harum sunt incidunt temporibus
        placeat
      </Text>
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
            0
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
            0
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color="gray.600"
          fontSize="18px"
          cursor="pointer"
        >
          {isBookmark ? 'bookmark' : 'bookmark_border'}
        </Box>
      </HStack>
    </VStack>
  );
};

export { PostCard };
