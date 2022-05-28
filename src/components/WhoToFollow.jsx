import { VStack, HStack, Image, Text, Button, Heading } from '@chakra-ui/react';
import profile_pic from '../asset/profile_pic.jpg';
const WhoToFollow = () => {
  const FollowUser = () => (
    <HStack justify="space-between" width="full">
      <HStack>
        <Image
          borderRadius="full"
          boxSize="48px"
          src={profile_pic}
          alt="user"
        />
        <VStack justify="center" align="center">
          <Text fontWeight="500">Jhon Doe</Text>
          <Text color="gray.600">@jhondoe</Text>
        </VStack>
      </HStack>
      <Button
        borderRadius="full"
        backgroundColor="#6d28d9"
        color="#fff"
        size="sm"
        _hover={{ backgroundColor: '#6d28d9' }}
      >
        Follow
      </Button>
    </HStack>
  );
  return (
    <VStack
      backgroundColor="#fff"
      borderRadius="2xl"
      align="flex-start"
      width="full"
      padding={4}
      spacing={5}
      boxShadow="xl"
    >
      <Heading as="h3" fontSize="20px">
        Who to follow
      </Heading>
      {[1, 2, 3, 4].map(item => (
        <FollowUser key={item} />
      ))}
    </VStack>
  );
};

export { WhoToFollow };
