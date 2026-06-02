import Button from "@/components/Button";
import Table, { Column } from "@/components/Table";
import { Job } from "@/libs/jobs/models";
import { formatCurrency } from "@/utils/currency";
import { getStatusStyles } from "@/utils/getStatusStyle";
import { Eye } from "lucide-react";
import ModalAssign from "../Modals/ModalAssign";
import { useDisclosure } from "@/utils/useDisclosure";
import {
  useMutationUpdateReporter,
  useQueryGetUsers,
} from "@/libs/users/queries";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalSpinner from "@/components/ModalSpinner";
import ModalSubmitReport from "../Modals/ModalSubmitReport";
import ModalReview from "../Modals/ModalReview";
import ModalCompletedConfirmation from "../Modals/ModalCompletedConfirmation";
import ModalJobDetails from "../Modals/ModalJobDetails";

export default function JobTable({
  data,
  isLoading,
}: {
  data: Job[];
  isLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [jobId, setJobId] = useState(0);
  const [jobName, setJobName] = useState("");
  const [jobData, setJobData] = useState<Job>();

  const [isLoadingAssignment, setIsLoadingAssignment] = useState(false);

  const { onToggle: onToggleModalSubmit, isOpen: isOpenModalSubmit } =
    useDisclosure();
  const { onToggle: onToggleAssignReporter, isOpen: isOpenAssignReporter } =
    useDisclosure();
  const { onToggle: onToggleAssignEditor, isOpen: isOpenAssignEditor } =
    useDisclosure();
  const { onToggle: onToggleReview, isOpen: isOpenReview } = useDisclosure();
  const { onToggle: onToggleConfirmation, isOpen: isOpenConfirmation } =
    useDisclosure();
  const { onToggle: onToggleView, isOpen: isOpenView } = useDisclosure();

  const { data: users } = useQueryGetUsers();

  const { mutate: handleMutationAssignment } = useMutationUpdateReporter();

  const transcriptionText = useMemo(() => {
    return data?.find((job) => job.id === jobId)?.recording_text;
  }, [jobId, data]);

  const handleAssignReporter = (reporterId: number) => {
    setIsLoadingAssignment(true);
    handleMutationAssignment(
      {
        role: "REPORTER",
        reporterId,
        jobId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          setIsLoadingAssignment(false);
        },
      },
    );
  };

  const handleAssignEditor = (editorId: number) => {
    setIsLoadingAssignment(true);
    handleMutationAssignment(
      {
        role: "EDITOR",
        editorId,
        jobId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          setIsLoadingAssignment(false);
        },
      },
    );
  };

  const columns: Column<Job>[] = [
    { header: "Case Name", key: "case_name" },
    {
      header: "Duration",
      key: "duration_minutes",
      render: (item) => `${item?.duration_minutes} min`,
    },
    {
      header: "Location",
      key: "city",
      render: (item) => item?.city || "-",
    },
    {
      header: "Reporter",
      key: "pic",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-medium">{item?.pic.reporter.name || "-"}</span>
          <span className="text-xs text-gray-500">
            {item?.pic.reporter.payout_status}
          </span>
          <span className="text-[12px] text-gray-500">
            {formatCurrency(item?.pic.reporter.payout || 0)}
          </span>
        </div>
      ),
    },
    {
      header: "Editor",
      key: "pic",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-medium">{item?.pic.editor.name || "-"}</span>
          <span className="text-xs text-gray-500">
            {item?.pic.editor.payout_status}
          </span>
          <span className="text-[12px] text-gray-500">
            {formatCurrency(item?.pic.editor.payout || 0)}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(item?.status || "")}`}
        >
          {item?.status}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (item) => (
        <div className="flex gap-6 text-sm justify-between items-center">
          <div className="w-full">
            {item?.status === "NEW" && (
              <Button
                fullWidth
                onClick={() => {
                  setJobId(item.id);
                  onToggleAssignReporter();
                }}
              >
                Assign
              </Button>
            )}
            {item?.status === "TRANSCRIBED" && !item.pic.editor.id && (
              <Button
                fullWidth
                onClick={() => {
                  onToggleAssignEditor();
                  setJobId(item.id);
                }}
              >
                Assign Editor
              </Button>
            )}

            {item?.status === "TRANSCRIBED" && item.pic.editor.id && (
              <Button
                fullWidth
                onClick={() => {
                  onToggleReview();
                  setJobId(item.id);
                }}
              >
                Review
              </Button>
            )}

            {item?.status === "ASSIGNED" && (
              <Button
                fullWidth
                onClick={() => {
                  setJobId(item.id);
                  onToggleModalSubmit();
                }}
              >
                Submit Report
              </Button>
            )}

            {item?.status === "REVIEWED" && (
              <Button
                fullWidth
                onClick={() => {
                  setJobId(item.id);
                  setJobName(item.case_name);
                  onToggleConfirmation();
                }}
              >
                Confirm
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex gap-2"
            onClick={() => {
              onToggleView();
              setJobData(item);
            }}
          >
            View
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoadingAssignment) {
    return <ModalSpinner />;
  }

  return (
    <>
      <ModalJobDetails
        data={jobData}
        isOpen={isOpenView}
        onClose={onToggleView}
      />
      <ModalCompletedConfirmation
        isOpen={isOpenConfirmation}
        onClose={onToggleConfirmation}
        jobId={jobId}
        caseName={jobName}
      />
      <ModalAssign
        isOpen={isOpenAssignReporter}
        onClose={onToggleAssignReporter}
        onAssign={(reporterId) => handleAssignReporter(reporterId)}
        title="Assign Reporter"
        users={users?.data?.filter((user) => user.role === "REPORTER") || []}
      />
      <ModalAssign
        isOpen={isOpenAssignEditor}
        onClose={onToggleAssignEditor}
        onAssign={(editorId) => handleAssignEditor(editorId)}
        title="Assign EDITOR"
        users={users?.data?.filter((user) => user.role === "EDITOR") || []}
      />
      <ModalSubmitReport
        isOpen={isOpenModalSubmit}
        onClose={() => onToggleModalSubmit()}
        jobId={jobId!}
      />
      <ModalReview
        isOpen={isOpenReview}
        transcriptionText={transcriptionText}
        onClose={onToggleReview}
        jobId={jobId}
      />
      <Table data={data} columns={columns} isLoading={isLoading} />;
    </>
  );
}
