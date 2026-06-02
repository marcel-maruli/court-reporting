import Modal from "@/components/Modal";
import ModalSpinner from "@/components/ModalSpinner";
import { JobCreatePayload } from "@/libs/jobs/models";
import { useMutationCreateJob } from "@/libs/jobs/queries";
import { useToast } from "@/utils/useToasts";
import { useQueryClient } from "@tanstack/react-query";
import { Briefcase, Clock, Building2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateJob({ isOpen, onClose }: ModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<JobCreatePayload>({
    defaultValues: { location_type: "PHYSICAL" },
  });

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
        onError: (error: any) => {
          toast.showToast(`Failed: ${error.message}`, "error");
          setIsLoading(false);
        },
      },
    );
  };

  if (isLoading) return <ModalSpinner />;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Job">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-4"
      >
        {/* Case Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 ">
            Case Name
          </label>
          <div className="relative flex items-center">
            <Briefcase className="absolute left-3 text-gray-400" size={18} />
            <input
              {...register("case_name", { required: "Case name is required" })}
              className="w-full text-black rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-400"
              placeholder="Enter case name"
            />
          </div>
          {errors.case_name && (
            <p className="text-red-500 text-xs">{errors.case_name.message}</p>
          )}
        </div>

        {/* Flex Row untuk Duration & City */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Duration (min)
            </label>
            <div className="relative flex items-center">
              <Clock className="absolute left-3 text-gray-400" size={18} />
              <input
                type="number"
                {...register("duration_minutes", {
                  required: "Duration is required.",
                  min: 1,
                })}
                className="w-full text-black rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-400"
                placeholder="60"
              />
            </div>
            {errors.duration_minutes && (
              <p className="text-red-500 text-xs">
                {errors.duration_minutes.message}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm placeholder:text-gray-400 font-medium text-gray-700">
              City
            </label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3 text-gray-400" size={18} />
              <input
                {...register("city", { required: "City is required" })}
                className="w-full text-black rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-400"
                placeholder="Jakarta"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Location Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Location Type
          </label>
          <div className="flex gap-6">
            {[
              { value: "PHYSICAL", label: "Physical" },
              { value: "REMOTE", label: "Remote" },
            ].map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  {...register("location_type")}
                  value={type.value}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-600">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all"
        >
          Create Job
        </button>
      </form>
    </Modal>
  );
}
