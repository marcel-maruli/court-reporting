import { LoadingSpinner } from "@/components/LoadingSpinner";
import ModalSpinner from "@/components/ModalSpinner";
import { JobCreatePayload } from "@/libs/jobs/models";
import { useMutationCreateJob } from "@/libs/jobs/queries";
import { useToast } from "@/utils/useToasts";
import { useQueryClient } from "@tanstack/react-query";
import { X, Briefcase, Clock, Building2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateJobModal({ isOpen, onClose }: ModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<JobCreatePayload>();

  const { mutate: createJob } = useMutationCreateJob();

  const handleSubmitForm = (data: JobCreatePayload) => {
    setIsLoading(true);
    createJob(
      { ...data, duration_minutes: Number(data.duration_minutes) },
      {
        onSuccess: () => {
          toast.showToast("Job created successfully!", "success");
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          setIsLoading(false);
          reset();
          onClose();
        },
        onError: (error) => {
          toast.showToast(`Failed to create job: ${error.message}`, "error");
          setIsLoading(false);
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <ModalSpinner />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm text-md">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">Create New Job</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            /* handle form logic here */
            console.log("Form data:", data);
            handleSubmitForm(data);
          })}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Name
            </label>
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                {...register("case_name", {
                  required: "Case name is required",
                })}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                name="case_name"
                placeholder="Enter case name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (min)
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  {...register("duration_minutes", {
                    required: "Duration is required",
                    min: {
                      value: 1,
                      message: "Duration must be a positive number",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  name="duration_minutes"
                  placeholder="60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  name="city"
                  placeholder="Jakarta"
                />
              </div>
            </div>
          </div>

          {/* Location Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("location_type", {
                    required: "Location type is required",
                  })}
                  name="location_type"
                  value="PHYSICAL"
                  className="accent-blue-600"
                />
                <span className="text-sm">Physical</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="location_type"
                  value="REMOTE"
                  className="accent-blue-600"
                />
                <span className="text-sm">Remote</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all mt-4"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
