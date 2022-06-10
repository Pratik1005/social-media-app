import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  currentUser: {},
  userProfile: {},
  status: 'idle',
  followStatus: 'idle',
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async uid => {
    try {
      const userProfile = {};
      const userRef = doc(db, 'users', uid);
      const postRef = doc(db, 'posts', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userProfile.userData = userSnap.data();
      }
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        userProfile.userPosts = postSnap.data().posts;
      }
      return userProfile;
    } catch (err) {
      console.error('get user profile', err);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ currentUserData, uid, name, username, photoURL }) => {
    try {
      // Add current user to user followers
      const followUserRef = doc(db, 'users', uid);
      const userData = {
        uid: currentUserData.uid,
        name: currentUserData.name,
        username: currentUserData.username,
        photoURL: currentUserData.photoURL,
      };
      await updateDoc(followUserRef, {
        followers: arrayUnion(userData),
      });
      // Add user to current user following
      const currentUserRef = doc(db, 'users', currentUserData.uid);
      const followUserData = { uid, name, username, photoURL };
      await updateDoc(currentUserRef, {
        following: arrayUnion(followUserData),
      });
      return { userData, followUserData };
    } catch (err) {
      console.error('follow user', err);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ currentUserData, unfollowUserData }) => {
    try {
      // remove current user from user followers
      const unfollowUserRef = doc(db, 'users', unfollowUserData.uid);
      await updateDoc(unfollowUserRef, {
        followers: unfollowUserData.followers.filter(
          user => user.uid !== currentUserData.uid
        ),
      });
      // remove user from current user following
      const currentUserRef = doc(db, 'users', currentUserData.uid);
      await updateDoc(currentUserRef, {
        following: currentUserData.followers.filter(
          user => user.uid !== unfollowUserData.uid
        ),
      });
      return {
        currentUserId: currentUserData.uid,
        unfollowUserId: unfollowUserData.uid,
      };
    } catch (err) {
      console.error('unfollow user', err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: state => {
      state.status = 'pending';
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.status = 'fulfilled';
    },
    [followUser.pending]: state => {
      state.followStatus = 'pending';
    },
    [followUser.fulfilled]: (state, action) => {
      state.userProfile.userData.followers.push(action.payload.userData);
      state.currentUser.following.push(action.payload.followUserData);
      state.followStatus = 'fulfilled';
    },
    [unfollowUser.pending]: state => {
      state.followStatus = 'pending';
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.userProfile.userData.followers =
        state.userProfile.userData.followers.filter(
          user => user.uid !== action.payload.currentUserId
        );
      state.currentUser.following = state.currentUser.following.filter(
        user => user.uid !== action.payload.unfollowUserId
      );
      state.followStatus = 'fulfilled';
    },
  },
});

export const { saveCurrentUser } = userSlice.actions;
export default userSlice.reducer;
