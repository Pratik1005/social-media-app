import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
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
  },
});

export default userSlice.reducer;
