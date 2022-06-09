import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';

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
            <Heading fontSize="25px" paddingBottom={2}>
              Bookmarks
            </Heading>
            <Text>No bookmarks to show</Text>
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
