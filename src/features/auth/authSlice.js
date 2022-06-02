import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { app, auth, db } from '../../firebase';

const initialState = {
  userData: {},
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
      console.log(response.user);
    } catch (err) {
      console.error('signup', err);
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
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
