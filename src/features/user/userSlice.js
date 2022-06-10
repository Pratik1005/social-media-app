import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  userProfile: {},
  status: 'idle',
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
    console.log('followuser', currentUserData, uid, name, username, photoURL);
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
      return userData;
    } catch (err) {
      console.error('follow user', err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserProfile.pending]: state => {
      state.status = 'pending';
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.status = 'fulfilled';
    },
    [followUser.fulfilled]: (state, action) => {
      state.userProfile.userData.followers.push(action.payload);
    },
  },
});

export default userSlice.reducer;
