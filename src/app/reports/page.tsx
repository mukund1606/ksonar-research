"use client";

import { api } from "@/trpc/react";

import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { Pagination, Spinner } from "@nextui-org/react";
import { useState } from "react";

type SearchParams = {
  industry?: string;
};

export default function ReportPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [latestReportsPage, setLatestReportsPage] = useState(1);
  const [topReportsPage, setTopReportsPage] = useState(1);

  const { data: reports } = api.report.getAllReports.useQuery();
  const industryWiseReports =
    searchParams.industry?.toLowerCase() === "all"
      ? reports
      : reports?.filter(
          (report) =>
            report.industry.toLowerCase() ===
            searchParams.industry?.toLowerCase(),
        );

  return (
    <>
      <div className="mt-4 flex flex-col items-center  gap-6 px-4 text-center md:px-8 xl:px-12">
        {searchParams.industry ? (
          <>
            {industryWiseReports ? (
              <div>
                <h1 className="mb-4 mt-8 text-4xl font-bold uppercase">
                  {searchParams.industry}
                  {` `}
                  Reports
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {industryWiseReports.map((report) => (
                    <ReportCard report={report} key={report.id} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <Spinner size="lg" />
              </>
            )}
          </>
        ) : (
          <>
            <div>
              <h1 className="mb-4 mt-8 text-4xl font-bold">Latest Reports</h1>
              {reports ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {reports
                    .slice((latestReportsPage - 1) * 4, latestReportsPage * 4)
                    .map((report) => (
                      <ReportCard report={report} key={report.id} />
                    ))}
                </div>
              ) : (
                <>
                  <Spinner size="lg" />
                </>
              )}
              {reports && (
                <div className="flex w-full justify-center p-2 pt-6">
                  <Pagination
                    total={Math.ceil(reports.length / 4)}
                    onChange={(page) => {
                      setLatestReportsPage(page);
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <h1 className="mb-4 mt-8 text-center text-4xl font-bold">
                Top Reports
              </h1>
              {reports ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {reports
                    .filter((report) => report.isTopReport)
                    .slice((topReportsPage - 1) * 4, topReportsPage * 4)
                    .map((report) => (
                      <ReportCard report={report} key={report.id} />
                    ))}
                </div>
              ) : (
                <>
                  <Spinner size="lg" />
                </>
              )}
              {reports && (
                <div className="flex w-full justify-center p-2 pt-6">
                  <Pagination
                    total={Math.ceil(
                      reports.filter((report) => report.isTopReport).length / 4,
                    )}
                    onChange={(page) => {
                      setTopReportsPage(page);
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
