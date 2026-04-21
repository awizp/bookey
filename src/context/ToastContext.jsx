import { createContext, useState, useCallback } from "react";

import ToastContainer from "../components/ui/ToastContainer";

const ToastContext = createContext();

let toastId = 0;

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const showToast = useCallback((message, type = "info") => {
        const id = toastId++;

        const newToast = {
            id,
            message,
            type,
        };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export { ToastProvider, ToastContext };