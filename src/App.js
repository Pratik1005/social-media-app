import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Home, Explore, Bookmark, Login, SignUp } from './pages';
import { RequiresAuth } from './features/auth/RequiresAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from './features/auth/authSlice';

function App() {
  const bgColor = useColorModeValue('#f7f7f7', '#171923');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (() => {
  //     onAuthStateChanged(auth, async user => {
  //       if (user) {
  //         const userObj = await getDoc(doc(db, `users/${user.uid}`));
  //         const currentData = userObj.data();
  //         console.log('currentData', currentData);
  //         if (currentData) {
  //           dispatch(setUserData(currentData));
  //         }
  //       }
  //     });
  //   })();
  // }, []);
  return (
    <Box backgroundColor={bgColor} minHeight="100vh">
      <ToastContainer autoClose={1200} />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route
          path={'/'}
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route
          path={'/explore'}
          element={
            <RequiresAuth>
              <Explore />
            </RequiresAuth>
          }
        />
        <Route
          path={'/bookmarks'}
          element={
            <RequiresAuth>
              <Bookmark />
            </RequiresAuth>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
