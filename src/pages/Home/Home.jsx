import {
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getHomePosts } from '../../features/post/postSlice';

const Home = () => {
  const { userData } = useSelector(state => state.auth);
  const { homePosts, homeStatus } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (homeStatus === 'idle') {
      dispatch(getHomePosts(userData.uid));
    }
  }, [homeStatus, dispatch]);

  const TrendIcon = () => (
    <span className="material-icons">local_fire_department</span>
  );
  const SortIcon = () => <span className="material-icons">swap_vert</span>;
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <VStack>
            <HStack width="full">
              <Button
                leftIcon={<TrendIcon />}
                width="full"
                borderRadius="full"
                variant="outline"
                color="gray.700"
                border="2px"
              >
                Trending
              </Button>
              <Button
                leftIcon={<SortIcon />}
                width="full"
                borderRadius="full"
                variant="outline"
                color="gray.700"
                border="2px"
              >
                Sort by
              </Button>
            </HStack>
            {homeStatus === 'loading' ? (
              <Spinner size="xl" />
            ) : (
              homePosts.map(post => <PostCard key={post.id} postData={post} />)
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

export { Home };
