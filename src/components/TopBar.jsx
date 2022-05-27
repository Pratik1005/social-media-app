import { HStack, Box, Heading } from '@chakra-ui/react';

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
        <Box as="span" className="material-icons" paddingRight={8}>
          dark_mode
        </Box>
        <Box as="span" className="material-icons" paddingRight={8}>
          account_circle
        </Box>
      </HStack>
    </HStack>
  );
};

export { TopBar };
