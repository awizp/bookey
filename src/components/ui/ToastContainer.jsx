const ToastContainer = ({ toasts, removeToast }) => {

    const getStyles = (type) => {
        if (type === "success") return "bg-green-500 text-white";
        if (type === "error") return "bg-red-500 text-white";
        return "bg-gray-800 text-white";
    };

    return (
        <div className="fixed top-4 right-4 space-y-3 z-50">

            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-3 rounded-xl shadow-lg text-sm min-w-50 animate-fadeIn ${getStyles(toast.type)}`}
                >
                    <div className="flex justify-between items-center gap-4">

                        <p>{toast.message}</p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-xs opacity-70 hover:opacity-100"
                        >
                            ✕
                        </button>

                    </div>
                </div>
            ))}

        </div>
    );
};

export default ToastContainer;