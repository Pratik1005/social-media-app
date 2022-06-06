import { HStack, Box, Heading, Image, Tooltip, Link } from '@chakra-ui/react';
import { defaultUser } from '../asset';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
  return (
    <HStack
      justify="space-between"
      paddingY={2}
      position="sticky"
      top="0"
      backgroundColor="rgba(247,247,247,0.9)"
    >
      <Heading
        as="h1"
        fontSize="5xl"
        fontFamily="'Parisienne', cursive;"
        color="#6d28d9"
      >
        Insight
      </Heading>
      <HStack>
        <Tooltip label="Change theme" fontSize="sm">
          <Box
            as="span"
            className="material-icons"
            marginRight={8}
            cursor="pointer"
          >
            dark_mode
          </Box>
        </Tooltip>

        <Box as={NavLink} to="/user/123" paddingRight={8} cursor="pointer">
          <Image
            borderRadius="full"
            boxSize="48px"
            src=""
            fallbackSrc={defaultUser}
            alt="user"
          />
        </Box>
      </HStack>
    </HStack>
  );
};

export { TopBar };
