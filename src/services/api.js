import axios from "axios";

const API_BASE_URL = "https://10c8382f-e6a9-4e41-971c-75dddff97fec-00-723c5ubruzak.pike.replit.dev";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // ✅ Fixed Bearer token format
    }
    return config;
});

// User Authentication APIs
export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (credentials) => api.post("/login", credentials);
export const logoutUser = () => api.post("/logout");

// Booking APIs
export const fetchBookings = async () => {
    try {
        const response = await api.get('/bookings');
        console.log("Fetched bookings:", response.data);  // Log the data to check
        return response.data; //  Returns correct data structure
    } catch (error) {
        console.error("Fetch Bookings Error:", error.response?.data || error.message);
        throw error;
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        console.error("API Booking Error:", error.response?.data || error.message);
        throw error;
    }
};

export const updateBooking = async (id, bookingData) => {
    try {
        const response = await api.put(`/bookings/${id}`, bookingData);
        return response.data;
    } catch (error) {
        console.error("Update Booking Error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteBooking = async (id) => {
    try {
        const response = await api.delete(`/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete Booking Error:", error.response?.data || error.message);
        throw error;
    }
};
