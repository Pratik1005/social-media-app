import { VStack, Box, HStack, Text, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const getActiveStyle = ({ isActive }) => ({
  fontWeight: isActive ? '800' : '500',
});

const NavMenu = () => {
  return (
    <VStack w="full" spacing={2} align="flex-start" position="sticky" top="74">
      <HStack
        as={NavLink}
        to="/"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: 'blackAlpha.200' }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          home
        </Box>
        <Text>Home</Text>
      </HStack>
      <HStack
        as={NavLink}
        to="/explore"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: 'blackAlpha.200' }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          explore
        </Box>
        <Text>Explore</Text>
      </HStack>
      <HStack
        as={NavLink}
        to="/bookmarks"
        fontSize={20}
        py={2}
        px={4}
        _hover={{ backgroundColor: 'blackAlpha.200' }}
        borderRadius="full"
        style={getActiveStyle}
      >
        <Box as="span" className="material-icons">
          bookmark
        </Box>
        <Text>Bookmarks</Text>
      </HStack>
      <Box width="full" paddingTop={5}>
        <Button
          size="lg"
          width="full"
          borderRadius="full"
          backgroundColor="#6D28D9"
          color="#fff"
          variant="solid"
          _hover={{ backgroundColor: '#6d28d9' }}
        >
          Add Post
        </Button>
      </Box>
    </VStack>
  );
};

export { NavMenu };
