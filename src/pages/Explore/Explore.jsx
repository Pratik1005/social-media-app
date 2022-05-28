import { Container, Grid, GridItem, VStack, Heading } from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  SearchBar,
} from '../../components';

const Explore = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <VStack>
            <Heading fontSize="25px">Explore</Heading>
            {[1, 2, 3, 4, 5].map(post => (
              <PostCard key={post} />
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

export { Explore };
