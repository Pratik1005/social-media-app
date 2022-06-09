import { Container, Grid, GridItem, VStack, Text } from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  ProfileCard,
} from '../../components';

const Profile = () => {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <TopBar />
      <Grid templateColumns="1fr 3fr 2fr" gap={8}>
        <GridItem>
          <NavMenu />
        </GridItem>
        <GridItem>
          <ProfileCard />
          <VStack>
            <Text>No posts to show</Text>
          </VStack>
        </GridItem>
        <GridItem position="sticky" top="74">
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Profile };
