import {
  Container,
  Grid,
  GridItem,
  VStack,
  Text,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  ProfileCard,
} from '../../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../features/user/userSlice';
import { getUserPosts } from '../../features/post/postSlice';

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userProfile, status, error } = useSelector(state => state.user);
  const { userPosts, userPostsStatus } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getUserProfile(params.uid));
    dispatch(getUserPosts(params.uid));
  }, [params.uid, dispatch]);
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          {error && <Text>{error}</Text>}
          {status === 'fulfilled' ? (
            <>
              <ProfileCard userData={userProfile.userData} />
              <VStack>
                {userPostsStatus === 'loading' && <Spinner size="xl" />}
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <PostCard key={post.id} postData={post} />
                  ))
                ) : (
                  <Text>No posts to show</Text>
                )}
              </VStack>
            </>
          ) : (
            <HStack justifyContent="center">
              <Spinner size="xl" />
            </HStack>
          )}
        </GridItem>
        <GridItem position="sticky" top="74">
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Profile };
