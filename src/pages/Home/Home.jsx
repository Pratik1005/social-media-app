import { Container, Grid, GridItem } from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';

const Home = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <PostCard />
        </GridItem>
        <GridItem>
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Home };
