import React from "react";
import BookingList from "./BookingList";

const BookingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      <BookingList />
    </div>
  );
};

export default BookingsPage;
