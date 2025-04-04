import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookings, createBooking, updateBooking, deleteBooking } from "../services/api";

// Fetch all bookings
export const getBookings = createAsyncThunk("bookings/getBookings", async (_, { rejectWithValue }) => {
    try {
        const data = await fetchBookings();
        console.log("Fetched bookings:", data); // ✅ Debugging log
        return data;
    } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});



// Create a new booking
export const addBooking = createAsyncThunk("bookings/addBooking", async (bookingData, { rejectWithValue }) => {
    try {
        console.log(bookingData)
        const response = await createBooking(bookingData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Update a booking
export const editBooking = createAsyncThunk("bookings/editBooking", async ({ id, bookingData }, { rejectWithValue }) => {
    try {
        const response = await updateBooking(id, bookingData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Delete a booking
export const removeBooking = createAsyncThunk("bookings/removeBooking", async (id, { rejectWithValue }) => {
    try {
        await deleteBooking(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const bookingSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.bookings.push(action.payload);
            })
            .addCase(editBooking.fulfilled, (state, action) => {
                const index = state.bookings.findIndex((b) => b.id === action.payload.id);
                if (index !== -1) state.bookings[index] = action.payload;
            })
            .addCase(removeBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter((b) => b.id !== action.payload);
            });
    },
});

export default bookingSlice.reducer;
