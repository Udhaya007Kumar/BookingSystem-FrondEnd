import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBookings, cancelBooking } from "./bookingsSlice";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/helpers";

const BookingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (status === "loading") return <Loading />;

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        items.map((b: any) => (
          <div
            key={b.id}
            className="p-5 bg-white rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <p className="font-semibold text-indigo-600">{b.username}</p>
              <p className="text-sm text-gray-600">{b.email}</p>
              <p className="text-sm text-gray-500">
                {formatDate(b.start_time)} ({b.duration_minutes} mins)
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  b.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {b.status}
              </span>
              {b.status !== "cancelled" && (
                <button
                  onClick={() => dispatch(cancelBooking(b.id))}
                  className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingList;
