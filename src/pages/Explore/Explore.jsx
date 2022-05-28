import {
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Input,
} from '@chakra-ui/react';
import { NavMenu, TopBar, WhoToFollow, PostCard } from '../../components';

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
            {[1, 2, 3, 4, 5].map(post => (
              <PostCard key={post} />
            ))}
          </VStack>
        </GridItem>
        <GridItem position="sticky" top="74">
          <Input
            placeholder="Search insight"
            borderRadius="full"
            marginBottom={2}
          />
          <WhoToFollow />
        </GridItem>
      </Grid>
    </Container>
  );
};

export { Explore };
