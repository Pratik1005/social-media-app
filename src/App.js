import './App.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Home, Explore, Bookmark, Login } from './pages';

function App() {
  const bgColor = useColorModeValue('#f7f7f7', '#171923');
  return (
    <Box backgroundColor={bgColor} minHeight="100vh">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/explore'} element={<Explore />} />
        <Route path={'/bookmarks'} element={<Bookmark />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
