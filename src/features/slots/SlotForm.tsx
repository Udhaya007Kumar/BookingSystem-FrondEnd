import React, { useState } from "react";
import Button from "../../components/Button";
import api from "../../api/axios";
import { useAppSelector } from "../../hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

interface Props {
  slotId?: number;
  onBooked?: () => void;
  onClose?: () => void;
  initialData?: { start_time: string; duration_minutes: number };
}

const SlotForm: React.FC<Props> = ({ slotId, onBooked, onClose, initialData }) => {
  const token = useAppSelector(s => s.auth.token);
  const [startTime, setStartTime] = useState<Date | null>(initialData ? new Date(initialData.start_time) : null);
  const [duration, setDuration] = useState<number>(initialData?.duration_minutes || 60);
  const [loading, setLoading] = useState(false);

  const createSlot = async () => {
    if (!startTime) return toast.error("Select start time");
    try {
      setLoading(true);
      await api.post("/slots", { start_time: startTime.toISOString(), duration_minutes: duration });
      toast.success("Slot created successfully");
      onBooked?.();
      onClose?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Create slot failed");
    } finally { setLoading(false); }
  };

  const updateSlot = async () => {
    if (!startTime) return toast.error("Select start time");
    try {
      setLoading(true);
      await api.put(`/slots/${slotId}`, { start_time: startTime.toISOString(), duration_minutes: duration });
      toast.success("Slot updated successfully");
      onBooked?.();
      onClose?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setLoading(false); }
  };

  const bookSlot = async () => {
    if (!token) return toast.error("Please login to book");
    try {
      setLoading(true);
      await api.post("/bookings", { slot_id: slotId });
      toast.success("Booked successfully");
      onBooked?.();
      onClose?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally { setLoading(false); }
  };

  if (slotId && !initialData) return <Button onClick={bookSlot} loading={loading}>Confirm Booking</Button>;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        slotId ? updateSlot() : createSlot();
      }}
      className="space-y-3"
    >
      <div>
        <label className="block mb-1 font-medium">Start Time</label>
        <DatePicker
          selected={startTime}
          onChange={date => setStartTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        {onClose && <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-700">Cancel</Button>}
        <Button type="submit" loading={loading}>{slotId ? "Update Slot" : "Create Slot"}</Button>
      </div>
    </form>
  );
};

export default SlotForm;
