import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExplorePosts } from '../../features/post/postSlice';

const Explore = () => {
  const dispatch = useDispatch();
  const { explorePosts, exploreStatus } = useSelector(state => state.post);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(
      getExplorePosts({
        uid: currentUser.uid,
        following: currentUser.following,
      })
    );
  }, []);
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <VStack>
            <Heading fontSize="25px" paddingBottom={2}>
              Explore
            </Heading>
            {exploreStatus === 'fulfilled' ? (
              <>
                {explorePosts.length > 0 ? (
                  explorePosts.map(post => (
                    <PostCard key={post.id} postData={post} />
                  ))
                ) : (
                  <Text>No post to show</Text>
                )}
              </>
            ) : (
              <Spinner size="xl" />
            )}
          </VStack>
        </GridItem>
        <GridItem position="sticky" top="74">
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Explore };
