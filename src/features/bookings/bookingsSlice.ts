import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = { items: [] as any[], status: "idle", error: null as string | null };

export const fetchBookings = createAsyncThunk("bookings/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/bookings");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const cancelBooking = createAsyncThunk("bookings/cancel", async (id:number, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/bookings/cancel/${id}`);
    return { id, ...res.data };
  } catch (err:any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const slice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookings.pending, (s) => { s.status = "loading"; })
      .addCase(fetchBookings.fulfilled, (s, a) => { s.status = "idle"; s.items = a.payload; })
      .addCase(fetchBookings.rejected, (s, a) => { s.status = "failed"; s.error = a.payload as string; })
      .addCase(cancelBooking.fulfilled, (s, a) => { s.items = s.items.map(b => b.id === a.payload.id ? { ...b, status: "cancelled" } : b); });
  }
});

export default slice.reducer;
