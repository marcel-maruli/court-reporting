import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "@/components/Modal";
import { useMutationUpdateStatus } from "@/libs/jobs/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/utils/useToasts";

interface ModalCompletedConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  caseName?: string;
  jobId: number;
}

const ModalCompletedConfirmation = ({
  isOpen,
  onClose,
  caseName,
  jobId,
}: ModalCompletedConfirmationProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: mutateUpdateStatus, isPending: isPendingUpdateStatus } =
    useMutationUpdateStatus();

  const handleConfirm = () => {
    setIsSubmitting(true);
    mutateUpdateStatus(
      { jobId, status: "COMPLETED" },
      {
        onSuccess: () => {
          toast.showToast(`Job status updated to COMPLETED!`, "success");
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          onClose();
        },
        onError: () => {
          toast.showToast("Failed to update status.", "error");
          onClose();
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Completion"
      size="sm"
    >
      <div className="flex flex-col gap-6 text-black">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-amber-50 rounded-full text-amber-500">
            <AlertTriangle size={32} />
          </div>
          <p className="text-gray-600 text-sm">
            Are you sure you want to mark{" "}
            <strong>{caseName || "this job"}</strong> as completed?
            <br />
            <br />
            This action will finalize the payout status and cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300"
          >
            {isSubmitting ? "Processing..." : "Yes, Complete It"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCompletedConfirmation;
