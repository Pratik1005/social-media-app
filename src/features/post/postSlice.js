import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
} from 'firebase/firestore';
import { nanoid } from '@reduxjs/toolkit';
import { db } from '../../firebase';

const initialState = {
  homePosts: [],
  explorePosts: [],
  bookmarks: [],
  newPost: {},
  homeStatus: 'idle',
  exploreStatus: 'idle',
  bookmarkStatus: 'idle',
  postStatus: 'idle',
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ uid, postText, name, username, photoURL }) => {
    try {
      const postRef = doc(collection(db, 'posts'), uid);
      const postId = nanoid();
      const newPost = {
        uid,
        id: postId,
        name,
        username,
        photoURL,
        postText,
        likes: 0,
        comments: [],
        uploadDate: new Date().toString(),
      };
      await updateDoc(postRef, {
        posts: arrayUnion({ ...newPost }),
      });
      console.log('new post', newPost);
      return newPost;
    } catch (err) {
      console.error('add post', err);
    }
  }
);

export const getHomePosts = createAsyncThunk('post/getHomePost', async uid => {
  try {
    const docRef = doc(db, 'posts', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().posts;
    }
  } catch (err) {
    console.error('get home posts', err);
  }
});

export const getExplorePosts = createAsyncThunk(
  'post/getExplorePosts',
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const allPosts = [];
      querySnapshot.forEach(doc => allPosts.push(doc.data()));
      return allPosts;
    } catch (err) {
      console.error('get explore posts', err);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [addPost.pending]: state => {
      state.postStatus = 'loading';
    },
    [addPost.fulfilled]: (state, action) => {
      state.homePosts.push(action.payload);
      state.postStatus = 'fulfilled';
    },
    [getHomePosts.pending]: state => {
      state.homeStatus = 'loading';
    },
    [getHomePosts.fulfilled]: (state, action) => {
      state.homePosts = action.payload;
      state.homeStatus = 'fulfilled';
    },
    [getExplorePosts.pending]: state => {
      state.status = 'loading';
    },
    [getExplorePosts.fulfilled]: (state, action) => {
      state.explorePosts = action.payload;
      state.status = 'fulfilled';
    },
  },
});

export default postSlice.reducer;
