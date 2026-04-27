const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

// get token from localStorage
const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
};

// reusable request
export const apiRequest = async (endpoint, method = "GET", body = null) => {
    const token = getToken();

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};