import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
  collection,
  getDoc,
  arrayRemove,
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
  likedPosts: [],
  newPost: {},
  singlePost: {},
  homeStatus: 'idle',
  exploreStatus: 'idle',
  userPostsStatus: 'idle',
  bookmarkStatus: 'idle',
  postStatus: 'idle',
  singlePostStatus: 'idle',
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
  'post/getUserPosts',
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

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ uid, id, currentLocation }, thunkAPI) => {
    try {
      const docRef = doc(db, 'posts', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userAllPosts = docSnap.data().posts;
        const updatedPosts = userAllPosts.filter(post => post.id !== id);
        await updateDoc(docRef, {
          posts: updatedPosts,
        });
        return { uid, id, currentLocation, updatedPosts };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getLikedPosts = createAsyncThunk(
  'post/getLikedPosts',
  async uid => {
    try {
      const docRef = doc(collection(db, 'likedPosts'), uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().likedPosts;
      }
    } catch (err) {
      console.error('get liked posts', err);
    }
  }
);

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ uid, id, postUserUid }) => {
    try {
      const likedPostsRef = doc(db, 'likedPosts', uid);
      await updateDoc(likedPostsRef, {
        likedPosts: arrayUnion(id),
      });
      const postsRef = doc(db, 'posts', postUserUid);
      const docSnap = await getDoc(postsRef);
      if (docSnap.exists()) {
        const userAllPosts = docSnap.data().posts;
        const updatedPosts = userAllPosts.map(post =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        );
        await updateDoc(postsRef, {
          posts: updatedPosts,
        });
      }
    } catch (err) {
      console.error('like post', err);
      toast.error(err);
    }
  }
);

export const unlikePost = createAsyncThunk(
  'post/unlikePost',
  async ({ uid, id, postUserUid }) => {
    try {
      const likedPostsRef = doc(db, 'likedPosts', uid);
      await updateDoc(likedPostsRef, {
        likedPosts: arrayRemove(id),
      });
      const postsRef = doc(db, 'posts', postUserUid);
      const docSnap = await getDoc(postsRef);
      if (docSnap.exists()) {
        const userAllPosts = docSnap.data().posts;
        const updatedPosts = userAllPosts.map(post =>
          post.id === id ? { ...post, likes: post.likes - 1 } : post
        );
        await updateDoc(postsRef, {
          posts: updatedPosts,
        });
      }
    } catch (err) {
      console.error('unlike post', err);
      toast.error(err);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  'post/getSinglePost',
  async ({ uid, postId }) => {
    try {
      const docRef = doc(db, 'posts', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().posts.filter(post => post.id === postId)[0];
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ uid, id, userComment }) => {
    try {
      const docRef = doc(db, 'posts', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updatedPosts = docSnap
          .data()
          .posts.map(post =>
            post.id === id
              ? { ...post, comments: [...post.comments, userComment] }
              : post
          );
        await updateDoc(docRef, {
          posts: updatedPosts,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export const editComment = createAsyncThunk(
  'post/editComment',
  async ({ userId, postId, id, commentNewText }) => {
    try {
      const docRef = doc(db, 'posts', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updatedPosts = docSnap.data().posts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map(comment =>
                  comment.id === id
                    ? { ...comment, commentText: commentNewText }
                    : comment
                ),
              }
            : post
        );
        await updateDoc(docRef, {
          posts: updatedPosts,
        });
      }
    } catch (err) {
      console.error('edit comment', err);
      toast.error(err);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async ({ userId, postId, id }) => {
    try {
      const docRef = doc(db, 'posts', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updatedPosts = docSnap.data().posts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter(comment => comment.id !== id),
              }
            : post
        );
        await updateDoc(docRef, {
          posts: updatedPosts,
        });
      }
    } catch (err) {
      console.error('delete comment', err);
      toast.error('err');
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
  reducers: {
    likePostToState: (state, action) => {
      state.likedPosts.push(action.payload.id);
      let postsArrayName = '';
      if (action.payload.currentLocation.includes('post')) {
        state.singlePost.likes++;
      } else {
        if (action.payload.currentLocation === '/') {
          postsArrayName = 'homePosts';
        }
        if (action.payload.currentLocation === '/explore') {
          postsArrayName = 'explorePosts';
        }
        if (action.payload.currentLocation.includes('user')) {
          postsArrayName = 'userPosts';
        }
        state[postsArrayName] = state[postsArrayName].map(post =>
          post.id === action.payload.id
            ? { ...post, likes: post.likes + 1 }
            : post
        );
      }
    },
    unlikePostToState: (state, action) => {
      state.likedPosts = state.likedPosts.filter(
        postId => postId !== action.payload.id
      );
      let postsArrayName = '';
      if (action.payload.currentLocation.includes('post')) {
        state.singlePost.likes--;
      } else {
        if (action.payload.currentLocation === '/') {
          postsArrayName = 'homePosts';
        }
        if (action.payload.currentLocation === '/explore') {
          postsArrayName = 'explorePosts';
        }
        if (action.payload.currentLocation.includes('user')) {
          postsArrayName = 'userPosts';
        }
        state[postsArrayName] = state[postsArrayName].map(post =>
          post.id === action.payload.id
            ? { ...post, likes: post.likes - 1 }
            : post
        );
      }
    },
    addCommentToState: (state, action) => {
      state.singlePost.comments.push(action.payload);
      toast.success('Added comment successfully');
    },
    editCommentToState: (state, action) => {
      state.singlePost.comments = state.singlePost.comments.map(comment =>
        comment.id === action.payload.id
          ? { ...comment, commentText: action.payload.commentNewText }
          : comment
      );
      toast.success('Edited comment successfully');
    },
    deleteCommentToState: (state, action) => {
      state.singlePost.comments = state.singlePost.comments.filter(
        comment => comment.id !== action.payload.id
      );
      toast.success('Deleted comment successfully');
    },
  },
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
      }
      if (action.payload.currentLocation === `/user/${action.payload.uid}`) {
        const updatedUserPosts = state.userPosts.map(post => {
          if (post.id === action.payload.id) {
            return { ...post, postText: action.payload.postNewText };
          }
          return post;
        });
        state.userPosts = updatedUserPosts;
      }
      toast.success('Edited post successfully');
      state.error = null;
    },
    [editPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deletePost.fulfilled]: (state, action) => {
      if (action.payload.currentLocation === '/') {
        state.homePosts = state.homePosts.filter(
          post => post.id !== action.payload.id
        );
      }
      if (action.payload.currentLocation === `/user/${action.payload.uid}`) {
        state.userPosts = action.payload.updatedPosts;
      }
      toast.success('Deleted post successfully');
      state.error = null;
    },
    [deletePost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getLikedPosts.fulfilled]: (state, action) => {
      state.likedPosts = action.payload;
      state.error = null;
    },
    [getSinglePost.pending]: state => {
      state.singlePostStatus = 'loading';
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
      state.singlePostStatus = 'fulfilled';
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

export const {
  addCommentToState,
  editCommentToState,
  deleteCommentToState,
  likePostToState,
  unlikePostToState,
} = postSlice.actions;
export default postSlice.reducer;
