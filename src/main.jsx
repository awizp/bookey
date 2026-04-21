import { createRoot } from 'react-dom/client';

import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from './context/DataContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from "./context/ToastContext";
import { TrackingProvider } from './context/TrackingContext.jsx';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <TrackingProvider>
        <DataProvider>
            <AuthProvider>
                <ThemeProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </ThemeProvider>
            </AuthProvider>
        </DataProvider>
    </TrackingProvider>
);
