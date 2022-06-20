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
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features/post/postSlice';

const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const { userData } = useSelector(state => state.auth);
  const { uid, name, username, photoURL } = userData;
  const dispatch = useDispatch();

  const handleAddPost = () => {
    dispatch(addPost({ uid, postText, name, username, photoURL }));
    onClose();
  };
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
            <Avatar name={name} src={photoURL} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Tell your Insight..."
              resize="none"
              rows="5"
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              _hover={{ backgroundColor: '#6d28d9' }}
              isDisabled={postText.trim().length === 0}
              onClick={handleAddPost}
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
