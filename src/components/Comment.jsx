import {
  VStack,
  HStack,
  Box,
  Avatar,
  Input,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addComment, addCommentToState } from '../features/post/postSlice';
import { CommentOption } from './index';

const Comment = ({ postData }) => {
  const { comments } = postData;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    const userComment = {
      uid: currentUser.uid,
      id: nanoid(),
      name: currentUser.name,
      username: currentUser.username,
      photoURL: currentUser.photoURL,
      commentText,
    };
    dispatch(addCommentToState(userComment));
    dispatch(addComment({ uid: postData.uid, id: postData.id, userComment }));
  };

  const UserComment = ({ commentData }) => {
    const { uid, name, username, photoURL, commentText } = commentData;
    return (
      <VStack width="full" align="flex-start">
        <Flex justifyContent="space-between" width="full">
          <HStack>
            <Box as={NavLink} to={`/user/${uid}`}>
              <Avatar name={name} src={photoURL} />
            </Box>
            <Flex justify="center" align="flex-start" flexDirection="column">
              <Text as="span" fontWeight="500">
                {name}
              </Text>
              <HStack>
                <Text as="span" color="gray.600" marginTop={0}>
                  {`@${username}`}
                </Text>
              </HStack>
            </Flex>
          </HStack>
          {currentUser.uid === uid && (
            <CommentOption commentData={commentData} />
          )}
        </Flex>
        <Text paddingLeft={16}>{commentText}</Text>
      </VStack>
    );
  };
  return (
    <VStack
      spacing={4}
      backgroundColor="#fff"
      borderRadius="2xl"
      padding={4}
      align="flex-start"
      width="full"
    >
      <HStack width="full" paddingY={4}>
        <Box as={NavLink} to={`/user/${currentUser.uid}`}>
          <Avatar name={currentUser.name} src={currentUser.photoURL} />
        </Box>
        <Input
          placeholder="Add your reply"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <Button
          variant="solid"
          borderRadius="full"
          backgroundColor="#6D28D9"
          color="#fff"
          _hover={{ backgroundColor: '#6d28d9' }}
          isDisabled={commentText.trim().length === 0}
          onClick={handleAddComment}
        >
          Reply
        </Button>
      </HStack>
      {comments.length > 0 &&
        comments.map(comment => (
          <UserComment key={comment.id} commentData={comment} />
        ))}
    </VStack>
  );
};

export { Comment };
