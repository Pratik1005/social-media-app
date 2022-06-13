import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';

const PostOption = () => {
  return (
    <Menu>
      <MenuButton>
        <Box as="span" className="material-icons">
          more_vert
        </Box>
      </MenuButton>
      <MenuList minWidth={140}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export { PostOption };
