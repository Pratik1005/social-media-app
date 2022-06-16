import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { EditComment } from './index';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features/post/postSlice';

const CommentOption = ({ commentData }) => {
  const { uid, id } = commentData;
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deletePost({ uid, id }));
  };
  return (
    <Menu>
      <MenuButton>
        <Box as="span" className="material-icons">
          more_vert
        </Box>
      </MenuButton>
      <MenuList minWidth={140}>
        <EditComment commentData={commentData} />
        <MenuItem color="red.600" onClick={handleDeleteComment}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export { CommentOption };
