import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";


type AuthState = {
token: string | null;
status: "idle" | "loading" | "failed";
error?: string | null;
};


const initialState: AuthState = {
token: localStorage.getItem("token") || null,
status: "idle",
error: null,
};


export const signupUser = createAsyncThunk(
"auth/signup",
async (payload: { username: string; email: string; password: string }, { rejectWithValue }) => {
try {
const res = await api.post("/auth/signup", payload);
return res.data.token;
} catch (err: any) {
return rejectWithValue(err.response?.data?.message || err.message);
}
}
);


export const loginUser = createAsyncThunk(
"auth/login",
async (payload: { email: string; password: string }, { rejectWithValue }) => {
try {
const res = await api.post("/auth/login", payload);
return res.data.token;
} catch (err: any) {
return rejectWithValue(err.response?.data?.message || err.message);
}
}
);


const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
logout(state) {
state.token = null;
state.status = "idle";
state.error = null;
localStorage.removeItem("token");
},
setToken(state, action: PayloadAction<string>) {
state.token = action.payload;
localStorage.setItem("token", action.payload);
},
},
extraReducers: (builder) => {
builder
.addCase(signupUser.pending, (state) => { state.status = "loading"; state.error = null; })
.addCase(signupUser.fulfilled, (state, action: PayloadAction<string>) => {
state.status = "idle";
state.token = action.payload;
localStorage.setItem("token", action.payload);
})
.addCase(signupUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload as string; })


.addCase(loginUser.pending, (state) => { state.status = "loading"; state.error = null; })
.addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
state.status = "idle";
state.token = action.payload;
localStorage.setItem("token", action.payload);
})
.addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload as string; });
},
});


export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;