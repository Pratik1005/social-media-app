import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookmarks } from '../../features/post/postSlice';
import { NavMenu, PostCard, TopBar, WhoToFollow } from '../../components';

const Bookmark = () => {
  const { bookmarks, bookmarkStatus } = useSelector(state => state.post);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log(bookmarks);

  useEffect(() => {
    dispatch(getBookmarks(currentUser.uid));
  }, [currentUser.uid, dispatch]);

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
              Bookmarks
            </Heading>
            {bookmarkStatus === 'fulfilled' ? (
              <>
                {bookmarks.length > 0 ? (
                  bookmarks.map(post => (
                    <PostCard key={post.id} postData={post} />
                  ))
                ) : (
                  <Text>No bookmarks to show</Text>
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

export { Bookmark };
