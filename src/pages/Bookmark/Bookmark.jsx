import { Container, Grid, GridItem, VStack, Heading } from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  SearchBar,
} from '../../components';

const Bookmark = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <VStack>
            <Heading fontSize="25px">Bookmarks</Heading>
            {[1, 2].map(post => (
              <PostCard key={post} isBookmark={true} />
            ))}
          </VStack>
        </GridItem>
        <GridItem position="sticky" top="74">
          <SearchBar />
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Bookmark };
