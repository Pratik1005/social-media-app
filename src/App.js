import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Explore,
  Bookmark,
  Login,
  SignUp,
  Profile,
  SinglePost,
} from './pages';
import { RequiresAuth } from './features/auth/RequiresAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from './features/auth/authSlice';
import { saveCurrentUser } from './features/user/userSlice';
import { getLikedPosts, getBookmarks } from './features/post/postSlice';

function App() {
  const bgColor = useColorModeValue('#f7f7f7', '#171923');
  const dispatch = useDispatch();

  onAuthStateChanged(auth, async user => {
    if (user) {
      const userObj = await getDoc(doc(db, `users/${user.uid}`));
      const currentData = userObj.data();
      console.log(currentData, 'currentUser');
      if (currentData) {
        dispatch(setUserData(currentData));
        dispatch(saveCurrentUser(currentData));
        dispatch(getLikedPosts(currentData.uid));
        dispatch(getBookmarks(currentData.uid));
      }
    }
  });

  return (
    <Box backgroundColor={bgColor} minHeight="100vh">
      <ToastContainer autoClose={1200} />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route element={<RequiresAuth />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/explore'} element={<Explore />} />
          <Route path={'/bookmarks'} element={<Bookmark />} />
          <Route path={'/user/:uid'} element={<Profile />} />
          <Route path={'/post/:uid/:postId'} element={<SinglePost />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
