import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <BrowserRouter>
        <Provider store={store}>
        <GoogleOAuthProvider clientId="355257631586-fahiun7ntpbaggjl7jrcm739kf7ctac8.apps.googleusercontent.com">
          <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    
  </StrictMode>
);
