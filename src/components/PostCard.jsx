import { VStack, HStack, Text, Box, Flex, Avatar } from '@chakra-ui/react';
import { formatDate, isPostLiked } from '../utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { PostOption } from './index';
import { useSelector, useDispatch } from 'react-redux';
import {
  likePost,
  unlikePost,
  likePostToState,
  unlikePostToState,
} from '../features/post/postSlice';

const PostCard = ({ postData }) => {
  const { currentUser } = useSelector(state => state.user);
  const { likedPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    uid,
    id,
    name,
    username,
    photoURL,
    postText,
    likes,
    comments,
    uploadDate,
  } = postData;
  const formattedDate = formatDate(uploadDate);

  const handleLikePost = () => {
    if (isPostLiked(id, likedPosts)) {
      dispatch(unlikePostToState({ id, currentLocation: location.pathname }));
      dispatch(
        unlikePost({
          uid: currentUser.uid,
          id,
          postUserUid: uid,
        })
      );
    } else {
      dispatch(
        likePostToState({
          uid,
          id,
          currentLocation: location.pathname,
        })
      );
      dispatch(
        likePost({
          uid: currentUser.uid,
          id,
          postUserUid: uid,
        })
      );
    }
    // isPostLiked(id, likedPosts)
    //   ? dispatch()
    //     unlikePost({
    //       uid: currentUser.uid,
    //       id,
    //       postUserUid: uid,
    //       currentLocation: location.pathname,
    //     })
    //   : dispatch(
    //       likePostToState({
    //         uid,
    //         id,
    //         currentLocation: location.pathname,
    //       })
    //     );
  };

  const LikeIcon = () => {
    return (
      <Box as="span" className="material-icons" color="red.700" fontSize="18px">
        favorite
      </Box>
    );
  };

  const UnlikeIcon = () => {
    return (
      <Box
        as="span"
        className="material-icons-outlined"
        color="gray.600"
        fontSize="18px"
      >
        favorite_border
      </Box>
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
              <Text as="span" fontWeight="500">
                ·
              </Text>
              <Text as="span" fontSize="14px">
                {formattedDate}
              </Text>
            </HStack>
          </Flex>
        </HStack>
        {currentUser.uid === uid && <PostOption postData={postData} />}
      </Flex>
      <Text as={NavLink} to={`/post/${uid}/${id}`} width="full">
        {postText}
      </Text>
      <HStack justify="space-between" width="full">
        <HStack cursor="pointer">
          <Box
            as="span"
            className="material-icons-outlined"
            color="gray.600"
            fontSize="18px"
            cursor="pointer"
          >
            mode_comment
          </Box>
          <Box as="span" fontSize="14px">
            {comments.length}
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color="gray.600"
          fontSize="18px"
          cursor="pointer"
        >
          share
        </Box>
        <HStack cursor="pointer" onClick={handleLikePost}>
          {isPostLiked(id, likedPosts) ? <LikeIcon /> : <UnlikeIcon />}
          <Box as="span" fontSize="14px">
            {likes}
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color="gray.600"
          fontSize="18px"
          cursor="pointer"
        >
          bookmark_border
        </Box>
      </HStack>
    </VStack>
  );
};

export { PostCard };
