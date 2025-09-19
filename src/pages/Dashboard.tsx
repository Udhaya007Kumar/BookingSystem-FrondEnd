import { useState } from "react";
import SlotList from "../features/slots/SlotList";
import BookingList from "../features/bookings/BookingList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"slots" | "bookings">("slots");

  return (
    <div className="max-w-6xl mx-auto px-4 py-15">
      {/* <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        My Dashboard
      </h2> */}

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setActiveTab("slots")}
          className={`px-4 py-2 rounded-l-lg ${
            activeTab === "slots"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Available Slots
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded-r-lg ${
            activeTab === "bookings"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          My Bookings
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow">
        {activeTab === "slots" ? <SlotList /> : <BookingList />}
      </div>
    </div>
  );
};

export default Dashboard;
