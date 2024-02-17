"use client";
import CreateReportForm from "@/components/CreateReport";
import ReportCard from "@/components/ReportCard";
import { api } from "@/trpc/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { PlusCircleIcon } from "lucide-react";

export default function ManageReportsPage() {
  const { data: reports } = api.report.getAllReports.useQuery();
  const {
    isOpen: isCreateReportOpen,
    onOpen: onCreateReportOpen,
    onOpenChange: onCreateReportOpenChange,
    onClose: onCreateReportClose,
  } = useDisclosure();

  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-24 px-4 md:px-8 xl:px-12">
        <div className="flex w-full justify-between">
          <div>
            <h1 className="mb-4 mt-8 text-left text-4xl font-bold">
              Manage Reports
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reports ? (
                reports.map((report) => (
                  <ReportCard report={report} key={report.id} isManage />
                ))
              ) : (
                <Spinner size="lg" />
              )}
            </div>
          </div>
          <Button
            aria-label="Create Report"
            className="text-xl font-bold"
            color="primary"
            onPress={onCreateReportOpen}
            isIconOnly
          >
            <PlusCircleIcon />
          </Button>
        </div>
      </div>
      <Modal
        isDismissable={false}
        isOpen={isCreateReportOpen}
        onOpenChange={onCreateReportOpenChange}
        closeButton={<></>}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create Report
          </ModalHeader>
          <ModalBody>
            <CreateReportForm onCreateReportClose={onCreateReportClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
