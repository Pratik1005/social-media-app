import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { EditPost } from './index';

const PostOption = ({ postData }) => {
  return (
    <Menu>
      <MenuButton>
        <Box as="span" className="material-icons">
          more_vert
        </Box>
      </MenuButton>
      <MenuList minWidth={140}>
        <EditPost postData={postData} />
        <MenuItem color="red.600">Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export { PostOption };
