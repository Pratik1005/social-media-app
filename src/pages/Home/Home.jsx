import {
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import {
  NavMenu,
  TopBar,
  WhoToFollow,
  PostCard,
  SearchBar,
} from '../../components';

const Home = () => {
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

export { Home };
