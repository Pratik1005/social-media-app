import { HStack, Box, Heading, Image, Tooltip } from '@chakra-ui/react';
import profile_pic from '../asset/profile_pic.jpg';

const TopBar = () => {
  return (
    <HStack justify="space-between" paddingY={2}>
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
            paddingRight={8}
            cursor="pointer"
          >
            dark_mode
          </Box>
        </Tooltip>

        <Box paddingRight={8} cursor="pointer">
          <Image
            borderRadius="full"
            boxSize="48px"
            src={profile_pic}
            alt="user"
          />
        </Box>
      </HStack>
    </HStack>
  );
};

export { TopBar };
