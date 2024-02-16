"use client";

import { api } from "@/trpc/react";

import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { Spinner } from "@nextui-org/react";

export default function ReportPage({
  params,
}: {
  params: { industry: string };
}) {
  const { data: reports } = api.report.getAllReports.useQuery();
  const neededReports =
    params.industry.toLowerCase() === "all"
      ? reports
      : reports?.filter(
          (report) =>
            report.industry.toLowerCase() === params.industry.toLowerCase(),
        );

  return (
    <>
      <div className="mt-4 flex flex-col items-center  gap-6 px-4 text-center md:px-8 xl:px-12">
        <div>
          <h1 className="mb-4 mt-8 text-4xl font-bold uppercase">
            {params.industry}
            {` `}
            Reports
          </h1>
          {neededReports ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {neededReports.map((report) => (
                <ReportCard report={report} key={report.id} />
              ))}
            </div>
          ) : (
            <>
              <Spinner size="lg" />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
