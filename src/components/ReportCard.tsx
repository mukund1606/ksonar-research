"use client";
import { api } from "@/trpc/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { type Report } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { PanelTopClose, PanelTopOpen, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ReportCard({
  report,
  isManage,
}: {
  report: Report;
  isManage?: boolean;
}) {
  const utils = api.useUtils();
  const deleteRoute = api.report.deleteReport.useMutation({
    onSuccess: async () => {
      await utils.report.getAllReports.invalidate();
    },
  });
  const changeTopStatusRoute = api.report.changeTopStatus.useMutation({
    onSuccess: async () => {
      await utils.report.getAllReports.invalidate();
    },
  });

  async function handleDelete() {
    try {
      await deleteRoute.mutateAsync({ id: report.id });
      toast.success("Report deleted successfully");
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error("Error", {
          description: error.message,
        });
      }
    }
  }

  async function handleTopReport() {
    try {
      await changeTopStatusRoute.mutateAsync({ id: report.id });
      toast.success("Report Modified Successfully");
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error("Error", {
          description: error.message,
        });
      }
    }
  }

  return (
    <Card className="z-0 flex max-w-[300px] flex-col justify-between">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="text-large font-bold text-primary underline">
          {report.title}
        </h4>
        <small className="text-default-500">{report.industry}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div>
          <p>{report.description}</p>
        </div>
        <CardFooter className="mt-auto w-full gap-2 px-1 pb-1">
          <Button
            color="primary"
            className="w-full text-medium font-semibold"
            as={Link}
            href={`/report/${report.id}`}
          >
            Read Report
          </Button>
          {isManage && (
            <>
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <Button color="danger" isIconOnly>
                    {report.isTopReport ? <PanelTopOpen /> : <PanelTopClose />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 px-1 py-2">
                    <div className="text-small font-bold">
                      {report.isTopReport ? "Remove from Top" : "Add to Top"}
                    </div>
                    <Button
                      color="danger"
                      className="w-full text-medium font-semibold"
                      onPress={handleTopReport}
                    >
                      Confirm
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <Button color="danger" isIconOnly>
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 px-1 py-2">
                    <div className="text-small font-bold">
                      Are you sure you want to delete this report?
                    </div>
                    <Button
                      color="danger"
                      className="w-full text-medium font-semibold"
                      onPress={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </CardFooter>
      </CardBody>
    </Card>
  );
}
