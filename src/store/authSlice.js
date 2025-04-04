import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../services/api";

// Login action
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await loginUser(credentials);
        localStorage.setItem("token", response.data.token); // Store token
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
});

// Logout action
export const logout = createAsyncThunk("auth/logout", async () => {
    await logoutUser();
    localStorage.removeItem("token"); // Clear token
});

// Register action
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
    try {
        const response = await registerUser(credentials);
        localStorage.setItem("token", response.data.token); // Store token
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: !!localStorage.getItem("token"), // Auto-check login
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            });
    },
});

export default authSlice.reducer;
