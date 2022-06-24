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
  Box,
  Image,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPost } from '../features/post/postSlice';

const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState({
    postImgURL: '',
    postImg: '',
  });
  const { currentUser } = useSelector(state => state.user);
  const { uid, name, username, photoURL } = currentUser;
  const dispatch = useDispatch();

  const handlePostImage = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 5000000) {
        setPostImage(() => ({
          postImgURL: URL.createObjectURL(file),
          postImg: file,
        }));
      } else {
        toast.error('Image size should not exceed 5MB');
      }
    }
  };

  const handleRemoveImage = () => {
    setPostImage(() => ({ postImgURL: '', postImg: '' }));
  };

  const handleAddPost = () => {
    dispatch(
      addPost({
        uid,
        postText,
        name,
        username,
        photoURL,
        postImage: postImage.postImg,
      })
    );
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
        display={['none', 'none', 'block']}
        variant="solid"
        _hover={{ backgroundColor: '#6d28d9' }}
        onClick={onOpen}
      >
        Add Post
      </Button>
      <Button
        size="lg"
        borderRadius="full"
        backgroundColor="#6D28D9"
        color="#fff"
        display={['block', 'block', 'none']}
        position="fixed"
        right="16px"
        bottom="72px"
        padding={3}
        variant="solid"
        _hover={{ backgroundColor: '#6d28d9' }}
        onClick={onOpen}
      >
        <Box as="span" className="material-icons">
          add
        </Box>
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
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
            {postImage.postImg && (
              <Box position="relative" paddingTop={2}>
                <Image
                  src={postImage.postImgURL}
                  width="full"
                  height="250px"
                  objectFit="contain"
                />
                <Box
                  as="span"
                  className="material-icons"
                  color="#fff"
                  backgroundColor="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  padding={2}
                  cursor="pointer"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  onClick={handleRemoveImage}
                >
                  close
                </Box>
              </Box>
            )}
            <FormLabel margin={0}>
              <Box
                as="span"
                className="material-icons-outlined"
                paddingTop={2}
                cursor="pointer"
              >
                image
              </Box>
              <Input
                type="file"
                display="none"
                accept="image/jpg, image/png, image/jpeg"
                onChange={e => handlePostImage(e)}
              />
            </FormLabel>
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
