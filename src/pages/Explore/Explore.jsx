import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExplorePosts } from '../../features/post/postSlice';

const Explore = () => {
  const dispatch = useDispatch();
  const { explorePosts, status } = useSelector(state => state.post);

  // useEffect(() => {
  //   dispatch(getExplorePosts());
  // }, []);
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
            {/* {status === "fulfilled" ? (
              explorePosts.map(post => <PostCard key={post.uid} postData={post} />)
            ): (
              <Text>Loading...</Text>
            )} */}
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
