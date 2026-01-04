import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Replace with your ACTUAL Client ID from Step 1 */}
    <GoogleOAuthProvider clientId="865336021474-7pfamp2os47q6p34aolr2fnvm5lkrlkv.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
