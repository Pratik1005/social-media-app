import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
  Text,
  Box,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UsersList = ({ title, users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');

  const SingleUser = ({ userData }) => {
    const { uid, name, username, photoURL } = userData;
    const [updatedUser, setUpdatedUser] = useState({ name, photoURL });

    useEffect(() => {
      (async () => {
        try {
          const userRef = doc(db, 'users', uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const newData = userSnap.data();
            setUpdatedUser(() => ({
              name: newData.name,
              photoURL: newData.photoURL,
            }));
          }
        } catch (err) {
          console.error('user list profile page', err);
        }
      })();
    }, [uid]);
    return (
      <HStack paddingY={4}>
        <Box as={NavLink} to={`/user/${uid}`}>
          <Avatar name={updatedUser.name} src={updatedUser.photoURL} />
        </Box>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text as="span" fontWeight="500">
            {updatedUser.name}
          </Text>
          <Text as="span" color={lightTextColor} marginTop={0}>
            {`@${username}`}
          </Text>
        </Flex>
      </HStack>
    );
  };
  return (
    <>
      <Box as="span" fontWeight="500">{`${users.length}`}</Box>
      <Text
        onClick={onOpen}
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
      >{`${title}`}</Text>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users.length > 0 ? (
              users.map(user => <SingleUser key={user.uid} userData={user} />)
            ) : (
              <Text paddingY={4}>{`No ${title} found`}</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { UsersList };
