import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

export type Slot = {
  id: number;
  start_time: string;
  duration_minutes: number;
  is_available?: boolean;
  created_at?: string;
  updated_at?: string;
};

type SlotsState = {
  slots: Slot[];
  status: "idle" | "loading" | "failed" | "creating" | "updating" | "deleting";
  error?: string | null;
};

const initialState: SlotsState = { slots: [], status: "idle", error: null };

// Fetch all
export const fetchSlots = createAsyncThunk<Slot[], void, { rejectValue: string }>(
  "slots/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<Slot[]>("/slots");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create
export const createSlot = createAsyncThunk<Slot, { start_time: string; duration_minutes: number }, { rejectValue: string }>(
  "slots/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post<Slot>("/slots", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update -> PUT /slots/:slotId
export const updateSlot = createAsyncThunk<Slot, { id: number; data: Partial<Slot> }, { rejectValue: string }>(
  "slots/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put<Slot>(`/slots/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete
export const deleteSlot = createAsyncThunk<number, number, { rejectValue: string }>(
  "slots/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/slots/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const slice = createSlice({
  name: "slots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(fetchSlots.fulfilled, (s, a: PayloadAction<Slot[]>) => { s.status = "idle"; s.slots = a.payload; })
      .addCase(fetchSlots.rejected, (s, a) => { s.status = "failed"; s.error = a.payload as string; })

      .addCase(createSlot.pending, (s) => { s.status = "creating"; s.error = null; })
      .addCase(createSlot.fulfilled, (s, a: PayloadAction<Slot>) => { s.status = "idle"; s.slots.push(a.payload); })
      .addCase(createSlot.rejected, (s, a) => { s.status = "failed"; s.error = a.payload as string; })

      .addCase(updateSlot.pending, (s) => { s.status = "updating"; s.error = null; })
      .addCase(updateSlot.fulfilled, (s, a: PayloadAction<Slot>) => {
        s.status = "idle";
        const idx = s.slots.findIndex(x => x.id === a.payload.id);
        if (idx !== -1) s.slots[idx] = a.payload;
      })
      .addCase(updateSlot.rejected, (s, a) => { s.status = "failed"; s.error = a.payload as string; })

      .addCase(deleteSlot.pending, (s) => { s.status = "deleting"; s.error = null; })
      .addCase(deleteSlot.fulfilled, (s, a: PayloadAction<number>) => { s.status = "idle"; s.slots = s.slots.filter(x => x.id !== a.payload); })
      .addCase(deleteSlot.rejected, (s, a) => { s.status = "failed"; s.error = a.payload as string; });
  },
});

export default slice.reducer;
  