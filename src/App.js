import './App.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';

function App() {
  const bgColor = useColorModeValue('#f7f7f7', '#171923');
  return (
    <Box backgroundColor={bgColor}>
      <Routes>
        <Route path={'/'} element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
