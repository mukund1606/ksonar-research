import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { type Report } from "@prisma/client";
import Link from "next/link";
import { Document, Page } from "react-pdf";

export default function ReportCard({ report }: { report: Report }) {
  return (
    <Card className="z-0 flex max-w-[300px] flex-col justify-between">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="text-large font-bold underline">{report.title}</h4>
        <small className="text-default-500">{report.industry}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {/* <div className="aspect-[4/3] w-[275px] overflow-hidden p-0">
          <Document file={report.fileUrl}>
            <Page
              width={275}
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div> */}
        <div>
          <p>{report.description}</p>
        </div>
        <CardFooter className="mt-auto w-full px-1 pb-1">
          <Button
            color="primary"
            className="w-full text-medium font-semibold"
            as={Link}
            href={`/report/${report.id}`}
          >
            Read Report
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
