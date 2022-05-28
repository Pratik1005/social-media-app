import { VStack, HStack, Image, Text } from '@chakra-ui/react';
import profile_pic from '../asset/profile_pic.jpg';

const PostCard = () => {
  return (
    <VStack>
      <HStack>
        <Image src={profile_pic} alt="user" />
        <VStack></VStack>
      </HStack>
      <Text></Text>
    </VStack>
  );
};
