import React, { useState } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import Modal from "@/components/Modal";
import { useToast } from "@/utils/useToasts";
import { useMutationUpdateStatus } from "@/libs/jobs/queries";
import ModalSpinner from "@/components/ModalSpinner";
import { useQueryClient } from "@tanstack/react-query";

interface ModalReviewProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  transcriptionText: string;
}

export default function ModalReview({
  isOpen,
  onClose,
  jobId,
  transcriptionText,
}: ModalReviewProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: mutateUpdateStatus, isPending: isPendingUpdateStatus } =
    useMutationUpdateStatus();
  const toast = useToast();

  const handleUpdateStatus = () => {
    setIsSubmitting(true);
    mutateUpdateStatus(
      { jobId, status: "REVIEWED" },
      {
        onSuccess: () => {
          toast.showToast(`Job status updated to REVIEWED!`, "success");
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          onClose();
        },
        onError: () => {
          toast.showToast("Failed to update status.", "error");
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  if (isPendingUpdateStatus) {
    return <ModalSpinner />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Transcription"
      size="lg"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText size={16} /> Transcription Content
          </label>
          <div className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap">
            {transcriptionText || "No transcription available for review."}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleUpdateStatus}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all"
          >
            <CheckCircle2 size={18} /> Mark as Reviewed
          </button>
        </div>
      </div>
    </Modal>
  );
}
