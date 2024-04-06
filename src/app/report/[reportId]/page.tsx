"use client";

import { api } from "@/trpc/react";

import Footer from "@/components/Footer";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

import ReportCard from "@/components/ReportCard";
import { MessageSquare } from "lucide-react";
import { isMobile } from "mobile-device-detect";
import Link from "next/link";

export default function ReportPage({
  params,
}: {
  params: { reportId: string };
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  if (!params.reportId) redirect("/not-found");
  const { data: report, isLoading } = api.report.getReport.useQuery({
    id: params.reportId,
  });
  const { data: randomReportData, isLoading: randomReportLoading } =
    api.report.getRandomReport.useQuery({
      id: params.reportId,
    });
  if (!isLoading && !report) redirect("/not-found");

  useEffect(() => {
    function handleResize() {
      setPageSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {report ? (
        <>
          <div className="mt-4 flex w-full items-center justify-center gap-6 px-3 md:px-8 xl:px-12">
            <div className="flex flex-col items-center gap-6 pt-12 md:flex-row md:items-start">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="mb-4 text-4xl font-bold uppercase">
                    {report.title}
                  </h1>
                  <p className="text-justify">{report.description}</p>
                </div>
                <div className="flex justify-center">
                  <Document
                    file={report.fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="w-fit border"
                        width={
                          isMobile
                            ? pageSize
                              ? pageSize * 0.8
                              : 300
                            : pageSize
                              ? pageSize > 1024
                                ? pageSize * 0.5
                                : pageSize > 768
                                  ? pageSize * 0.6
                                  : pageSize * 0.8
                              : 0
                        }
                      />
                    ))}
                  </Document>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {randomReportData && !randomReportLoading && (
                  <div className="pt-4">
                    <h1 className="text-center text-2xl font-bold">
                      You may also like
                    </h1>
                    <div className="flex flex-col gap-4 pt-2">
                      {randomReportData.map((report) => (
                        <ReportCard report={report} key={report.id} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <h1 className="text-center text-2xl font-bold">
                    {"Let's Connect"}
                  </h1>
                  <Card className="max-w-[300px]">
                    <CardHeader className="items-center justify-center ">
                      <h4 className="text-lg font-bold">Pankaj Kumar</h4>
                    </CardHeader>
                    <CardBody className="flex-row gap-2 px-3 text-small text-default-400">
                      <MessageSquare size={30} />
                      <Link
                        className="text-black underline dark:text-white"
                        href="https://wa.me/919911931247"
                        target="_blank"
                      >
                        Connect
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="mt-4 flex flex-col items-center  gap-6 px-4 text-center md:px-8 xl:px-12">
          <div className="flex h-[85vh] w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        </div>
      )}
    </>
  );
}
