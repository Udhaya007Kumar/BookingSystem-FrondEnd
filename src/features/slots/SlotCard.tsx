import React, { memo } from "react";
import { formatDate } from "../../utils/helpers";

interface Props {
  slot: any;
  onBook?: (s: any) => void;
  onEdit?: (s: any) => void;
  onDelete?: (s: any) => void;
}

const SlotCard: React.FC<Props> = ({ slot, onBook, onEdit, onDelete }) => {
  return (
    <div
      className={`p-5 rounded-2xl shadow-lg border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl ${
        slot.is_available ? "bg-white" : "bg-gray-100 opacity-80"
      }`}
    >
      <div className="text-lg font-semibold text-gray-800 mb-1">{formatDate(slot.start_time)}</div>
      <div className="text-sm text-gray-500 mb-3">Duration: {slot.duration_minutes} mins</div>

      <div className="flex gap-2 flex-wrap">
        <button
          disabled={!slot.is_available}
          onClick={() => onBook?.(slot)}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
            slot.is_available
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Book
        </button>

        <button
          onClick={() => onEdit?.(slot)}
          className="px-4 py-2 rounded-xl font-medium text-sm bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(slot)}
          className="px-4 py-2 rounded-xl font-medium text-sm bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(SlotCard);
