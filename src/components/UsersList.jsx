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
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const UsersList = ({ title, users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SingleUser = ({ userData }) => {
    const { uid, name, username, photoURL } = userData;
    return (
      <HStack paddingY={4}>
        <Box as={NavLink} to={`/user/${uid}`}>
          <Avatar name={name} src={photoURL} />
        </Box>
        <Flex justify="center" align="flex-start" flexDirection="column">
          <Text as="span" fontWeight="500">
            {name}
          </Text>
          <Text as="span" color="gray.600" marginTop={0}>
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
