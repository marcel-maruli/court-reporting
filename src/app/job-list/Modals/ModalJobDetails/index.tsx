import { FileText, User, DollarSign, MapPin, Clock } from "lucide-react";
import Modal from "@/components/Modal";
import { getStatusStyles } from "@/utils/getStatusStyle";

interface ModalJobDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // Anda bisa mendefinisikan interface yang lebih spesifik jika perlu
}

export default function ModalJobDetails({
  isOpen,
  onClose,
  data,
}: ModalJobDetailsProps) {
  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Case Details" size="lg">
      <div className="flex flex-col gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{data.case_name}</h3>
          <div className="flex gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {data.duration_minutes} min
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {data.city} ({data.location_type})
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(data?.status || "")}`}
            >
              {data?.status}
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
            <FileText size={16} /> Transcription Result
          </label>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 italic">
            "{data.recording_text || "No transcription available."}"
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
              <User size={14} /> Reporter
            </div>
            <p className="font-semibold text-slate-800">
              {data.pic.reporter.name}
            </p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-slate-500 flex items-center gap-1">
                <DollarSign size={14} /> {data.pic.reporter.payout}
              </span>
              <span
                className={`font-medium ${data.pic.reporter.payout_status === "PENDING" ? "text-yellow-500" : "text-green-600"}`}
              >
                {data.pic.reporter.payout_status}
              </span>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
              <User size={14} /> Editor
            </div>
            <p className="font-semibold text-slate-800">
              {data.pic.editor.name}
            </p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-slate-500 flex items-center gap-1">
                <DollarSign size={14} /> {data.pic.editor.payout}
              </span>
              <span
                className={`font-medium ${data.pic.reporter.payout_status === "PENDING" ? "text-yellow-500" : "text-green-600"}`}
              >
                {data.pic.editor.payout_status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
