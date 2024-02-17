"use client";

import { api } from "@/trpc/react";

import Footer from "@/components/Footer";
import { Spinner } from "@nextui-org/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

import { isMobile } from "mobile-device-detect";

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
          <div className="mt-4 flex flex-col items-center  gap-6 px-4 md:px-8 xl:px-12">
            <div className="max-w-[85%] md:max-w-[50%]">
              <h1 className="mb-4 mt-8 text-4xl font-bold uppercase">
                {report.title}
              </h1>
              <p>{report.description}</p>
              <div className="flex flex-col items-center pt-8">
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
