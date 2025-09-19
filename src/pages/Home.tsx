import React from "react";
import SlotList from "../features/slots/SlotList";

const Home = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Available Slots
      </h2>
      <SlotList />
    </div>
  );
};

export default Home;
