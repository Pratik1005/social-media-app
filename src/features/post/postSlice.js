import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
  collection,
  getDoc,
} from 'firebase/firestore';
import { nanoid } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { sortPosts } from '../../utils/utils';
import { toast } from 'react-toastify';

const initialState = {
  homePosts: [],
  explorePosts: [],
  userPosts: [],
  bookmarks: [],
  newPost: {},
  homeStatus: 'idle',
  exploreStatus: 'idle',
  userPostsStatus: 'idle',
  bookmarkStatus: 'idle',
  postStatus: 'idle',
  error: null,
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ uid, postText, name, username, photoURL }, thunkAPI) => {
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
      return newPost;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'post/getUserPost',
  async (uid, thunkAPI) => {
    try {
      const docRef = doc(db, 'posts', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return sortPosts(docSnap.data().posts, 'newest');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ uid, id, postNewText, currentLocation }, thunkAPI) => {
    try {
      const docRef = doc(db, 'posts', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userAllPosts = docSnap.data().posts;
        const updatedPosts = userAllPosts.map(post => {
          if (post.id === id) {
            return { ...post, postText: postNewText };
          }
          return post;
        });
        await updateDoc(docRef, {
          posts: updatedPosts,
        });
        return { uid, id, postNewText, currentLocation };
      }
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const getAllPost = async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    let allPosts = [];
    querySnapshot.forEach(
      doc => (allPosts = [...allPosts, ...doc.data().posts])
    );
    return allPosts;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
};

export const getHomePosts = createAsyncThunk(
  'post/getHomePost',
  async ({ uid, following }, thunkAPI) => {
    try {
      const allPosts = await getAllPost();
      const homePosts = allPosts.filter(post =>
        following.some(item => item.uid === post.uid)
      );
      homePosts.push(...allPosts.filter(post => post.uid === uid));
      return sortPosts(homePosts, 'newest');
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getExplorePosts = createAsyncThunk(
  'post/getExplorePosts',
  async ({ uid, following }, thunkAPI) => {
    try {
      const allPosts = await getAllPost();
      const filterPosts = allPosts.filter(
        post => !following.some(item => item.uid === post.uid)
      );
      const explorePosts = filterPosts.filter(post => post.uid !== uid);
      return sortPosts(explorePosts, 'newest');
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
      state.error = null;
    },
    [addPost.fulfilled]: (state, action) => {
      state.homePosts.unshift(action.payload);
      state.postStatus = 'fulfilled';
      state.error = null;
      toast.success('Added post successfully');
    },
    [addPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [editPost.fulfilled]: (state, action) => {
      if (action.payload.currentLocation === '/') {
        const updatedHomePosts = state.homePosts.map(post => {
          if (post.id === action.payload.id) {
            return { ...post, postText: action.payload.postNewText };
          }
          return post;
        });
        state.homePosts = updatedHomePosts;
        state.error = null;
      }
      if (action.payload.currentLocation === `/user/${action.payload.uid}`) {
        const updatedUserPosts = state.userPosts.map(post => {
          if (post.id === action.payload.id) {
            return { ...post, postText: action.payload.postNewText };
          }
          return post;
        });
        state.userPosts = updatedUserPosts;
        state.error = null;
      }
      toast.success('Edited post successfully');
    },
    [editPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getUserPosts.loading]: state => {
      state.userPostsStatus = 'loading';
      state.error = null;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
      state.userPostsStatus = 'fulfilled';
      state.error = null;
    },
    [getHomePosts.pending]: state => {
      state.homeStatus = 'loading';
      state.error = null;
    },
    [getHomePosts.fulfilled]: (state, action) => {
      state.homePosts = action.payload;
      state.homeStatus = 'fulfilled';
      state.error = null;
    },
    [getHomePosts.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getExplorePosts.pending]: state => {
      state.exploreStatus = 'loading';
      state.error = null;
    },
    [getExplorePosts.fulfilled]: (state, action) => {
      state.explorePosts = action.payload;
      state.exploreStatus = 'fulfilled';
      state.error = null;
    },
    [getExplorePosts.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
