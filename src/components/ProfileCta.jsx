import { Button } from '@chakra-ui/react';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../features/user/userSlice';

const ProfileCta = ({ followUserData }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const currentUserData = { ...userData };
  console.log('userData', userData);
  const FollowOrUnfollow = () => {
    return (
      <>
        {userData.following.find(user => user.uid === followUserData.uid) ? (
          <Button
            variant="outline"
            onClick={() =>
              dispatch(followUser({ currentUserData, ...followUserData }))
            }
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              dispatch(followUser({ currentUserData, ...followUserData }))
            }
          >
            Follow
          </Button>
        )}
      </>
    );
  };
  return (
    <>
      {userData.uid === followUserData.uid ? (
        <>
          <Button variant="outline" marginRight={4}>
            Edit Profile
          </Button>
          <Button colorScheme="red" onClick={() => dispatch(userLogout())}>
            Logout
          </Button>
        </>
      ) : (
        <FollowOrUnfollow />
      )}
    </>
  );
};

export { ProfileCta };
