import { Button } from '@chakra-ui/react';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../features/user/userSlice';

const ProfileCta = ({ followUserData }) => {
  const dispatch = useDispatch();
  const { currentUser, userProfile, followStatus } = useSelector(
    state => state.user
  );
  const currentUserData = { ...currentUser };
  const unfollowUserData = { ...userProfile.userData };

  const FollowOrUnfollow = () => {
    return (
      <>
        {currentUser.following.some(user => user.uid === followUserData.uid) ? (
          <Button
            variant="outline"
            isLoading={followStatus === 'pending'}
            onClick={() =>
              dispatch(unfollowUser({ currentUserData, unfollowUserData }))
            }
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="outline"
            isLoading={followStatus === 'pending'}
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
      {currentUser.uid === followUserData.uid ? (
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
