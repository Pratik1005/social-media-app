import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';

const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="lg"
        width="full"
        borderRadius="full"
        backgroundColor="#6D28D9"
        color="#fff"
        variant="solid"
        _hover={{ backgroundColor: '#6d28d9' }}
        onClick={onOpen}
      >
        Add Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Avatar name="Jhon doe" src="" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Tell your Insight..." resize="none" />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              _hover={{ backgroundColor: '#6d28d9' }}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddPost };
