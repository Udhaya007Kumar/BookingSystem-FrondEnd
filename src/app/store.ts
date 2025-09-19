import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import slotsReducer from "../features/slots/slotsSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slots: slotsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
