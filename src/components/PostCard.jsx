import {
  VStack,
  HStack,
  Text,
  Box,
  Flex,
  Avatar,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatDate, isPostLiked, isPostBookmarked } from '../utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { PostOption } from './index';
import { useSelector, useDispatch } from 'react-redux';
import {
  likePost,
  unlikePost,
  likePostToState,
  unlikePostToState,
  bookmarkPost,
  bookmarkToState,
  unbookmarkPost,
  unbookmarkFromState,
} from '../features/post/postSlice';
import { useFetchUser } from '../hooks';

const PostCard = ({ postData }) => {
  const { currentUser } = useSelector(state => state.user);
  const { likedPosts, bookmarks } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    uid,
    id,
    username,
    postText,
    postImage,
    likes,
    comments,
    uploadDate,
  } = postData;
  const formattedDate = formatDate(uploadDate);
  const postBgColor = useColorModeValue('#ffffff', 'gray.700');
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('gray.600', 'gray.100');
  const likeColor = useColorModeValue('red.700', 'gray.100');
  const updatedUser = useFetchUser(uid, 'post card');

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
  };

  const handleBookmark = () => {
    if (isPostBookmarked(id, bookmarks)) {
      dispatch(unbookmarkFromState(id));
      dispatch(unbookmarkPost({ userId: currentUser.uid, id }));
    } else {
      dispatch(bookmarkToState(postData));
      dispatch(bookmarkPost({ userId: currentUser.uid, postData }));
    }
  };

  const LikeIcon = () => {
    return (
      <Box
        as="span"
        className="material-icons"
        color={likeColor}
        fontSize="18px"
      >
        favorite
      </Box>
    );
  };

  const UnlikeIcon = () => {
    return (
      <Box
        as="span"
        className="material-icons-outlined"
        color={iconColor}
        fontSize="18px"
      >
        favorite_border
      </Box>
    );
  };
  return (
    <VStack
      spacing={4}
      backgroundColor={postBgColor}
      borderRadius="2xl"
      padding={4}
      align="flex-start"
      width="full"
    >
      <Flex justifyContent="space-between" width="full">
        <HStack>
          <Box as={NavLink} to={`/user/${uid}`}>
            <Avatar name={updatedUser.name} src={updatedUser.photoURL} />
          </Box>
          <Flex justify="center" align="flex-start" flexDirection="column">
            <Text as="span" fontWeight="500">
              {updatedUser.name}
            </Text>
            <HStack>
              <Text as="span" color={lightTextColor} marginTop={0}>
                {`@${username}`}
              </Text>
              <Text as="span" fontWeight="500">
                ·
              </Text>
              <Text as="span" fontSize="14px" color={lightTextColor}>
                {formattedDate}
              </Text>
            </HStack>
          </Flex>
        </HStack>
        {currentUser.uid === uid && !location.pathname.includes('post') && (
          <PostOption postData={postData} />
        )}
      </Flex>
      <Text as={NavLink} to={`/post/${uid}/${id}`} width="full">
        {postText}
      </Text>
      {postImage && (
        <Image
          src={postImage}
          width="full"
          height="300px"
          objectFit="contain"
        />
      )}
      <HStack justify="space-between" width="full">
        <HStack as={NavLink} to={`/post/${uid}/${id}`}>
          <Box
            as="span"
            className="material-icons-outlined"
            color={iconColor}
            fontSize="18px"
            cursor="pointer"
          >
            mode_comment
          </Box>
          <Box as="span" fontSize="14px">
            {comments.length}
          </Box>
        </HStack>
        <HStack cursor="pointer" onClick={handleLikePost}>
          {isPostLiked(id, likedPosts) ? <LikeIcon /> : <UnlikeIcon />}
          <Box as="span" fontSize="14px">
            {likes}
          </Box>
        </HStack>
        <Box
          as="span"
          className="material-icons"
          color={iconColor}
          fontSize="18px"
          cursor="pointer"
          onClick={handleBookmark}
        >
          {isPostBookmarked(id, bookmarks) ? 'bookmark' : 'bookmark_border'}
        </Box>
      </HStack>
    </VStack>
  );
};

export { PostCard };
