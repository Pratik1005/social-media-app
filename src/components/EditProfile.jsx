import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalFooter,
  VStack,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from '@chakra-ui/react';
import { useState } from 'react';
import { defaultHeader } from '../asset';

const EditProfile = ({ userData }) => {
  const { name, bio, website, photoURL, headerImage } = userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileData, setProfileData] = useState({
    name: name,
    bio: bio,
    website: website,
  });

  const handleInputChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {};
  return (
    <>
      <Button variant="outline" marginRight={4} onClick={onOpen}>
        Edit profile
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EditProfile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Image
                src={headerImage}
                fallbackSrc={defaultHeader}
                borderRadius="md"
              />
            </Box>
            <VStack width="full" alignItems="flex-start" padding={4}>
              <Box width="120px" height="120px" marginTop="-60px">
                <Avatar src={photoURL} name={name} size="xl" />
              </Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter name"
                  name="name"
                  value={profileData.name}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="Enter bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  placeholder="Enter website"
                  name="website"
                  value={profileData.website}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              borderRadius="full"
            >
              Cancel
            </Button>
            <Button
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              variant="solid"
              _hover={{ backgroundColor: '#6d28d9' }}
              onClick={handleSaveProfile}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditProfile };
