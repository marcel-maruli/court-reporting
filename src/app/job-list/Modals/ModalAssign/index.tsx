import { User } from "lucide-react";
import Modal from "@/components/Modal";
import { useState } from "react";

interface UserOption {
  id: number;
  name: string;
  city: string;
  is_available: boolean;
}

interface ModalAssignProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: UserOption[];
  onAssign: (userId: number) => void; // Fungsi submit
}

export default function ModalAssign({
  isOpen,
  onClose,
  title,
  users,
  onAssign,
}: ModalAssignProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onAssign(selectedUserId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <div className="flex flex-col gap-2 max-h-75 overflow-y-auto">
          {users.length > 0 ? (
            users.map((user) => (
              <label
                key={user.id}
                className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedUserId === user.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${!user.is_available ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="radio"
                  name="assignUser"
                  value={user.id}
                  disabled={!user.is_available}
                  onChange={() => setSelectedUserId(user.id)}
                  className="accent-blue-600"
                />
                <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.city}</p>
                </div>
              </label>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">
              No personnel available.
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!selectedUserId}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-2.5 rounded-lg transition-all"
        >
          Confirm Assignment
        </button>
      </form>
    </Modal>
  );
}
