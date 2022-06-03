import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Home, Explore, Bookmark, Login, SignUp } from './pages';
import { RequiresAuth } from './features/auth/RequiresAuth';

function App() {
  const bgColor = useColorModeValue('#f7f7f7', '#171923');
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
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
