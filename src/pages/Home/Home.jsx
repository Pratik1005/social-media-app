import { Container, Grid, GridItem } from '@chakra-ui/react';
import { NavMenu } from '../../components';

const Home = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <h1>Post Feed</h1>
        </GridItem>
        <GridItem>
          <h1>Who to follow</h1>
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Home };
