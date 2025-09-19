import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchSlots, deleteSlot } from "./slotsSlice";
import SlotCard from "./SlotCard";
import SlotForm from "./SlotForm";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";

const SlotList: React.FC = () => {
  const dispatch = useAppDispatch();
  const slots = useAppSelector(s => s.slots.slots);
  const status = useAppSelector(s => s.slots.status);

  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [showFormForCreate, setShowFormForCreate] = useState(false);
  const [editSlot, setEditSlot] = useState<any | null>(null);

  useEffect(() => { dispatch(fetchSlots()); }, [dispatch]);

  const handleDelete = async (slot: any) => {
    if (!confirm("Are you sure to delete this slot?")) return;
    try {
      await dispatch(deleteSlot(slot.id)).unwrap();
      toast.success("Slot deleted successfully");
    } catch (err: any) {
      toast.error(err || "Delete failed");
    }
  };

  if (status === "loading") return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Slots</h2>
        <button
          onClick={() => setShowFormForCreate(true)}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create Slot
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((s: any) => (
          <SlotCard
            key={s.id}
            slot={s}
            onBook={setSelectedSlot}
            onEdit={setEditSlot}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Create Slot Modal */}
      <Modal
        isOpen={showFormForCreate}
        onClose={() => setShowFormForCreate(false)}
        title="Create Slot"
      >
        <SlotForm
          onBooked={() => { setShowFormForCreate(false); dispatch(fetchSlots()); }}
          onClose={() => setShowFormForCreate(false)}
        />
      </Modal>

      {/* Edit Slot Modal */}
      <Modal
        isOpen={!!editSlot}
        onClose={() => setEditSlot(null)}
        title="Edit Slot"
      >
        {editSlot && (
          <SlotForm
            slotId={editSlot.id}
            initialData={{ start_time: editSlot.start_time, duration_minutes: editSlot.duration_minutes }}
            onBooked={() => { setEditSlot(null); dispatch(fetchSlots()); }}
            onClose={() => setEditSlot(null)}
          />
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        isOpen={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        title="Book Slot"
      >
        {selectedSlot && (
          <SlotForm
            slotId={selectedSlot.id}
            onBooked={() => { setSelectedSlot(null); dispatch(fetchSlots()); }}
            onClose={() => setSelectedSlot(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default SlotList;
