import { createRoot } from 'react-dom/client';

import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from './context/DataContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <DataProvider>
        <AuthProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </AuthProvider>
    </DataProvider>
);
