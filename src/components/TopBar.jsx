import { HStack, Box, Heading, Tooltip, Avatar } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = () => {
  const { userData } = useSelector(state => state.auth);
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

        <Box
          as={NavLink}
          to={`/user/${userData.uid}`}
          paddingRight={8}
          cursor="pointer"
        >
          <Avatar src={userData.photoURL} name={userData.name} />
        </Box>
      </HStack>
    </HStack>
  );
};

export { TopBar };
