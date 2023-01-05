//React Library
import React from 'react';
import ReactDOM from 'react-dom/client';
//User-Components
import App from './App';
import './styles/index.css';
import { MyAuthProvider } from './utils/context/AuthContext';
import { MyThemeProvider } from './utils/context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

//User Authentication and themes are wrapped around App component
root.render(
    <MyAuthProvider>    
        <MyThemeProvider>
            <App />
        </MyThemeProvider>
    </MyAuthProvider>
);

