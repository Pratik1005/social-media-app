import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { app, auth, db } from '../../firebase';

const initialState = {
  userData: null,
  status: 'idle',
};

export const userSignUp = createAsyncThunk(
  'auth/userSignUp',
  async ({ email, fullName, username, password }, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('createUser', response.user);
      const userDetails = {
        uid: response.user.uid,
        email,
        name: fullName,
        username,
        photoURL: '',
        headerImage: '',
        bio: '',
        posts: [],
        followers: [],
        following: [],
        bookmarks: [],
      };
      const userRef = doc(collection(db, 'users'), response.user.uid);
      await setDoc(userRef, { ...userDetails });
      return userDetails;
    } catch (err) {
      console.error('signup', err);
      toast.error(err.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(collection(db, 'users'), response.user.uid);
      const userDetails = await getDoc(userRef);
      console.log(userDetails.data());
      return userDetails.data();
    } catch (err) {
      console.error('login', err);
      toast.error(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [userSignUp.pending]: state => {
      state.status = 'loading';
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'fulfilled';
    },
    [userLogin.pending]: state => {
      state.status = 'loading';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.staus = 'fulfilled';
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
