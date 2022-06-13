import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  MenuItem,
  Button,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { editPost } from '../features/post/postSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const EditPost = ({ postData }) => {
  const { uid, id, postText } = postData;
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postNewText, setPostNewText] = useState(postText);

  const handleSavePost = () => {
    dispatch(
      editPost({ uid, id, postNewText, currentLocation: location.pathname })
    );
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Tell your Insight..."
              resize="none"
              rows="5"
              value={postNewText}
              onChange={e => setPostNewText(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              borderRadius="full"
            >
              Close
            </Button>
            <Button
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              variant="solid"
              _hover={{ backgroundColor: '#6d28d9' }}
              isDisabled={postNewText.length === 0}
              onClick={handleSavePost}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditPost };
