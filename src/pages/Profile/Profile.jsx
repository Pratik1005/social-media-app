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
import { getUserProfile, saveCurrentUser } from '../../features/user/userSlice';

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userProfile, status } = useSelector(state => state.user);
  const { userData } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(params.uid));
    dispatch(saveCurrentUser(userData));
  }, [params.uid]);
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          {status === 'fulfilled' ? (
            <>
              <ProfileCard userData={userProfile.userData} />
              <VStack>
                {userProfile.userPosts.length > 0 ? (
                  userProfile.userPosts.map(post => (
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
