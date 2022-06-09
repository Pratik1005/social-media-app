import { Button } from '@chakra-ui/react';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileCta = ({ uid }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  return (
    <>
      {userData.uid === uid ? (
        <>
          <Button variant="outline" marginRight={4}>
            Edit Profile
          </Button>
          <Button colorScheme="red" onClick={() => dispatch(userLogout())}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="outline">Follow</Button>
      )}
    </>
  );
};

export { ProfileCta };
