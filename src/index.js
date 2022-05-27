import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </StrictMode>
);
