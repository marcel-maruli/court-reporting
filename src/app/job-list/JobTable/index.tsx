import Button from "@/components/Button";
import Table, { Column } from "@/components/Table";
import { Job } from "@/libs/jobs/models";
import { formatCurrency } from "@/utils/currency";
import { getStatusStyles } from "@/utils/getStatusStyle";
import { Eye } from "lucide-react";

export default function JobTable({
  data,
  isLoading,
}: {
  data: Job[];
  isLoading: boolean;
}) {
  const handleAssignReporter = (jobId: number) => {
    console.log(`Assign reporter for job ID: ${jobId}`);
  };

  const handleAssignEditor = (jobId: number) => {
    console.log(`Assign editor for job ID: ${jobId}`);
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
        <div className="flex gap-1 text-sm justify-between items-center">
          <div>
            {item?.status === "NEW" && (
              <Button onClick={() => handleAssignReporter(item.id)}>
                Assign
              </Button>
            )}

            {item?.status === "TRANSCRIBED" && (
              <Button onClick={() => handleAssignEditor(item.id)}>
                Review
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex gap-2"
            onClick={() => console.log(`View details for job ID: ${item?.id}`)}
          >
            View
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return <Table data={data} columns={columns} isLoading={isLoading} />;
}
