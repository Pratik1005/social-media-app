import {
  VStack,
  HStack,
  Text,
  Box,
  Flex,
  Avatar,
  Image,
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

const PostCard = ({ postData }) => {
  const { currentUser } = useSelector(state => state.user);
  const { likedPosts, bookmarks } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    uid,
    id,
    name,
    username,
    photoURL,
    postText,
    postImage,
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
            <Avatar
              name={currentUser.uid === uid ? currentUser.name : name}
              src={currentUser.uid === uid ? currentUser.photoURL : photoURL}
            />
          </Box>
          <Flex justify="center" align="flex-start" flexDirection="column">
            <Text as="span" fontWeight="500">
              {currentUser.uid === uid ? currentUser.name : name}
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
          onClick={handleBookmark}
        >
          {isPostBookmarked(id, bookmarks) ? 'bookmark' : 'bookmark_border'}
        </Box>
      </HStack>
    </VStack>
  );
};

export { PostCard };
