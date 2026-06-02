import React, { useRef, useState } from "react";
import { FileAudio, X, Upload, Loader2, CheckCircle2 } from "lucide-react";
import Modal from "@/components/Modal";
import { useToast } from "@/utils/useToasts";
import {
  useMutationAudioTranscription,
  useMutationUpdateStatus,
} from "@/libs/jobs/queries";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface ModalSubmitReportProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
}

export default function ModalSubmitReport({
  isOpen,
  onClose,
  jobId,
}: ModalSubmitReportProps) {
  const [reportText, setReportText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<{
    reportText: string;
  }>();

  const { mutate: mutateAudioTranscription, isPending: isTranscribing } =
    useMutationAudioTranscription();
  const { mutate: mutateUpdateStatus } = useMutationUpdateStatus();

  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("audio/")) {
      toast.showToast("Only audio files are allowed!", "error");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.showToast("Maximum file size is 5MB", "error");
      return;
    }

    setFile(selectedFile);
    mutateAudioTranscription(
      { audio: selectedFile },
      {
        onSuccess: (res) => {
          toast.showToast("Transcription complete!", "success");
          setReportText(res?.transcription || "");
          setValue("reportText", res?.transcription);
          clearErrors();
        },
        onError: () => {
          setFile(null);
          toast.showToast("Failed to transcribe audio.", "error");
        },
      },
    );
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    mutateUpdateStatus(
      {
        jobId,
        status: "TRANSCRIBED",
        recordingText: reportText,
      },
      {
        onSuccess: () => {
          onClose();
          toast.showToast("Report submitted!", "success");
          setIsSubmitting(false);
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
        },
        onError: () => {
          setIsSubmitting(false);
          toast.showToast("Failed to submit a report.", "error");

          onClose();
        },
      },
    );
    toast.showToast("Report submitted successfully!", "success");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Transcription Report"
      size="md"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 text-black"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Transcription Result
          </label>
          <div className="relative">
            <textarea
              {...register("reportText", {
                required: "Report is Required.",
              })}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm resize-none transition-all"
              placeholder="Your transcription will appear here..."
            />
            {errors.reportText?.message && (
              <p className="text-red-500 text-xs">
                {errors.reportText.message}
              </p>
            )}

            {isTranscribing && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                  <span className="text-sm font-medium text-blue-700">
                    AI is transcribing...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Auto-transcribe from Audio
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              file
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {file ? (
              <div className="flex items-center gap-3 px-4 max-w-[calc(100%-50px)]">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <FileAudio size={20} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold truncate">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-blue-600 font-medium">
                    Ready for transcription
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setReportText("");
                  }}
                  className="ml-4 p-1 hover:bg-white rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                <Upload size={20} className="mb-1" />
                <span className="text-xs font-medium">
                  Click to upload audio file
                </span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isTranscribing}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          {isSubmitting ? "Submitting..." : "Confirm & Submit Report"}
        </button>
      </form>
    </Modal>
  );
}
