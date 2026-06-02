"use client";

import MainLayout from "@/components/MainLayout";
import { useQueryGetJobs } from "@/libs/jobs/queries";
import JobTable from "./JobTable";
import { Job } from "@/libs/jobs/models";
import Button from "@/components/Button";
import { useDisclosure } from "@/utils/useDisclosure";
import CreateJobModal from "./Modals/ModalCreateJob";

const JobList = () => {
  const { onToggle, isOpen } = useDisclosure();

  const { data: jobs, isLoading } = useQueryGetJobs();

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 max-h-[calc(100vh-180px)]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-black">Job List</p>

          <Button size="sm" onClick={onToggle}>
            <p className="font-bold">+ Add Job</p>
          </Button>
        </div>
        <JobTable data={jobs?.data as Job[]} isLoading={isLoading} />
      </div>
      <CreateJobModal isOpen={isOpen} onClose={onToggle} />
    </MainLayout>
  );
};

export default JobList;
